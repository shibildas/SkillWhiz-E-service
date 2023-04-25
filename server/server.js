const express = require ("express")
const server = express()
const logger = require("morgan")
const path = require('path')
const dotenv = require("dotenv")
dotenv.config()
const http = require('http')
const {Server}= require('socket.io')
const cors = require("cors")
const bodyParser = require("body-parser")
const adminRoute = require("./Routes/adminRoute")
const userRoute= require("./Routes/userRoute")
const expertRoute= require("./Routes/expertRoute")

const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL
const connectDb = require("./Controller/config/dbConfig")
const usermodel = require("./Model/userSchema")
const createMessage = require("./Controller/createMessage")
const getMessages = require("./Controller/getMessages")
const expertmodel = require("./Model/expertSchema")
const leaveRoom = require("./Controller/utils/leaveRoom")
const httpServer = http.createServer(server)

const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST']
    }
  })


server.use('/', express.static(path.join(__dirname, 'Public')))
server.use(bodyParser.json({limit:"1200kb"}))

connectDb(DATABASE_URL)

server.use(cors({
    origin:['http://localhost:5173'],
    methods:['GET','POST'],
    credentials:true
}))

server.use(logger("dev"))
server.use(express.urlencoded({extended:false}))
server.use(express.json())


//Routes
server.use("/",userRoute)
server.use("/admin",adminRoute)
server.use("/expert",expertRoute)


// server.listen(port,()=>{
//     console.log(`Server Listening at : http://127.0.0.1:${port}`);
// })

httpServer.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`)
  })
  let chatRoom=''
  let allUsers=[]
  const CHAT_BOT = 'ChatBot'
  io.on('connection', (socket) => {
    console.log(`a user connected at ${socket.id}`)
    socket.on("send_message",({username,room, message, } )=>{
      console.log(username);
      let __createdtime__ = Date.now()
       createMessage(username, room, message, __createdtime__ ).then((res)=>{
            console.log(res);
          }).catch(err=>console.log(err.message)) 
        socket.emit('receive_message', {
          message: `Welcome`,
          username: CHAT_BOT,
          __createdtime__,
        });
        socket.on('receive_message', (data) => {
          console.log(data); // Do something with the data (e.g. display it on the frontend)
        });

        // chatRoom=room
        // allUsers.push({id:socket.id,username,room})
        // chatRoomUsers = allUsers.filter((user)=> user.room===room)
        // socket.to(room).emit('chatroom_users',chatRoomUsers)
        // socket.emit('chatroom_users',chatRoomUsers)

        getMessages(room).then(last_100=>{
          socket.emit('last_100_messages',last_100)
        }).catch(err=>console.log(err))


        socket.on('disconnect', async () => {
          console.log('User disconnected from the chat');
          try {
            const user = await usermodel.findOne({ _id: room});
            const expert = await expertmodel.findOne({ _id: room});
            if (user?.name) {
              allUsers = leaveRoom(socket.id, allUsers);
              socket.to(chatRoom).emit('chatroom_users', allUsers);
              socket.to(chatRoom).emit('receive_message', {
                message: `${user.name} has disconnected from the chat.`,
              });
            }
            else if (expert?.username) {
              allUsers = leaveRoom(socket.id, allUsers);
              socket.to(chatRoom).emit('chatroom_users', allUsers);
              socket.to(chatRoom).emit('receive_message', {
                message: `${expert.username} has disconnected from the chat.`,
              });
            }
          } catch (err) {
            console.error(err);
          }
        });
      })
      

  })

module.exports = server
const express = require ("express")
const swaggerjsdoc=require('swagger-jsdoc')
const swaggerui = require('swagger-ui-express')
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
const httpServer = http.createServer(server)

const io = new Server(httpServer, {

    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  })
server.use('/', express.static(path.join(__dirname, 'Public')))
server.use(bodyParser.json({limit:"1200kb"}))
connectDb(DATABASE_URL)
server.use(cors({
    origin:['*'],
    methods:['GET','POST'],
    credentials:true
}))

server.use(logger("dev"))
server.use(express.urlencoded({extended:false}))
server.use(express.json())

//Routes
server.use("/backend",userRoute)
server.use("/backend/admin",adminRoute)
server.use("/backend/expert",expertRoute)
//Chat Socket
  global.onlineUsers= new Map()
  io.on("connection",(socket)=>{
    global.chatSocket =socket

    socket.on("add-user",(userId)=>{
      onlineUsers.set(userId,socket.id)
    })

    socket.on('send-message',(data)=>{
      const sendUserSocket= onlineUsers.get(data.to)
      if(sendUserSocket){
        socket.to(sendUserSocket).emit('msg-recieve',data.msg)
      }
    })
  })
  const options={
    definition:{
      openapi:'3.0.0',
      info:{
        title:"SkillWhiz E-Services API Docs",
        version:'1.0.0',
        description:"This is a simple E-Service API made with Express, NodeJs, Cloudinary, MongoDB, JsonWebToken, RazorPay, Socket.io, Twilio, morgan",
        contact:{
          name:"Shibildev",
          email:"shibildas@gmail.com",
        },
      },
      servers:[
        {
          url:`http://127.0.0.1:${port}`
        }
      ],
    },
    apis:['./Routes/*.js'],
  }
  const spacs=swaggerjsdoc(options)
  server.use('/api-docs',swaggerui.serve,
  swaggerui.setup(spacs))
  //Server Listening
 httpServer.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`)
    console.log(`Api Documentation at http://127.0.0.1:${port}/api-docs`)
})  

module.exports = server
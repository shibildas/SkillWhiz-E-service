const express = require ("express")
const server = express()
const logger = require("morgan")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const bodyParser = require("body-parser")
const adminRoute = require("./Routes/adminRoute")
const userRoute= require("./Routes/userRoute")
const expertRoute= require("./Routes/expertRoute")
// const bcrypt = require('bcrypt')
// const adminDB = require('./Model/adminSchema')
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL
const connectDb = require("./Controller/config/dbConfig")

// const addadmin =  async() => {
 
// let password = "password"
// let salt = await bcrypt.genSalt(10)
// let pass = await bcrypt.hash(password, salt)
// let email = "admin@gmail.com"
//  await adminDB.insertMany({
//     email:email,
//     password:pass,
//   })

// }
// addadmin()


server.use(bodyParser.json({limit:"500kb"}))

connectDb(DATABASE_URL)

server.use(cors({
    origin:['http://localhost:5173'],
    methods:['GET','POST'],
    credentials:true
}))

server.use(logger("dev"))
server.use(express.urlencoded({extended:false}))
server.use(express.json())
server.use(cookieParser())

//Routes
server.use("/",userRoute)
server.use("/admin",adminRoute)
server.use("/expert",expertRoute)


server.listen(port,()=>{
    console.log(`Server Listening at : http://127.0.0.1:${port}`);
})

module.exports = server
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
const connectDb = require("./Controller/config/dbConfig")




server.use(bodyParser.json({limit:"500kb"}))

connectDb(DATABASE_URL)

server.use(cors({
    origin:['http://localhost:1234'],
    methods:['GET','POST'],
    credentials:true
}))

server.use(logger("dev"))
server.use(express.urlencoded({extended:false}))
server.use(express.json())
server.use(cookieParser())
server.listen(port,()=>{
    console.log(`Server Listening at : http://127.0.0.1:${port}`);
})

module.exports = server
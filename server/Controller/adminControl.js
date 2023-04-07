const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const adminModel =require('../Model/adminSchema')
const usermodel = require('../Model/userSchema')

module.exports.adminLogin = async (req, res) => {
    try {
        const {email,password}=req.body
        const admin =await adminModel.findOne({email: email})
        if(admin){
            const isMatch = await bcrypt.compare(password,admin.password)
            if(admin.email === email && isMatch){
                const token = jwt.sign({ adminID: admin._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                const admindetails ={
                    email: admin.email,
                }
                res.json({"auth":true,"token":token,"result":admindetails, "status": "success", "message": "signin success" })

            }else{
                res.json({"auth":false, "status": "failed", "message": "User password is incorrect" })
            }
        }else{
            res.json({"adminauth":false, "status": "failed", "message": "No Admin found" })

        }
        
    } catch (error) {
        console.log(error)
    }
   
}

module.exports.isAdminAuth = async (req, res) => {
    try {   
    let admin = await adminModel.findById(req.adminId)
    
 console.log(req.adminId)
    const admindetails ={
        email: admin.email,
    }
    res.json({"auth":true,"result":admindetails, "status": "success", "message": "signin success" })
    } catch (error) {
        console.log(error)
    }
    

}

module.exports.getUsers = async (req,res)=>{
    try {
        const users = await usermodel.find({})  
        res.json({"status":"success",result:users})
    } catch (error) {
        res.json({"status":"failed",message:error.message})
        
    }
}

module.exports.deleteUsers= async (req,res)=>{
    try {
        const id= req.body.id
        await usermodel.findByIdAndDelete(id)
        const users = await usermodel.find({})      
        res.json({"status":"success",result:users})
    } catch (error) {
        res.json({"status":"failed",message:error.message})
    }
}

module.exports.blockUser= async (req,res)=>{
    try {
        await usermodel.findByIdAndUpdate(id,{isBanned:true})
        const users = await usermodel.find({})
        res.json({"status":"success",result:users})
    } catch (error) {
        res.json({"status":"failed",message:error.message})
    }
}
module.exports.addUsers =async (req,res)=>{
    try {
        const {username,email,password} = req.body
        console.log(username);
        const user = await usermodel.findOne({email})
        if(user){
            console.log(user);
            res.json({"status": "failed", "message": "Email already exists" })
        }else{
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password.trim(), salt)
            await usermodel.create({
                username,
                email,
                password:hashPassword
            })
            res.json({ "status": "success", "message": "user add success" })

        }
        
    } catch (error) {
        res.json({"status": "failed", "message":error.message})
        
    }
}
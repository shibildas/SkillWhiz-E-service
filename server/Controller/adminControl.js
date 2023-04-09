const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs');
const adminModel =require('../Model/adminSchema')
const usermodel = require('../Model/userSchema')
const expertmodel=require("../Model/expertSchema")
const jobsmodel = require("../Model/jobsSchema")
const cloudinary = require('cloudinary').v2;



cloudinary.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Cloud_API_Key,
  api_secret: process.env.Cloud_API_SECRET
});

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
        const user = await usermodel.findOne({email})
        if(user){
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
module.exports.getExperts= async(req,res)=>{
    try {
        const experts= await expertmodel.find({})
        res.json({"status":"success",result:experts})
        
    } catch (error) {
        res.json({"status":"failed","message":error.message})
    }

}
module.exports.getJobs= async(req,res)=>{
    try {
        const jobs= await jobsmodel.find({})
        res.json({"status":"success",result:jobs})
        
    } catch (error) {
        res.json({"status":"failed","message":error.message})
    }

}

module.exports.addJobs= async(req,res)=>{
    try {
        const job_role=req.body.job?.toLowerCase()
        const job = await jobsmodel.findOne({job_role : job_role})
        if(job){
            res.json({"status":"error",message:"Job Name Already Exist"})
        }else{
            const result = await cloudinary.uploader.upload(req.file.path,{
                transformation: [{ width: 200, height: 200 }]})
            await jobsmodel.create({
                job_role:req.body.job,
                base_rate:req.body.bRate,
                add_rate:req.body.adRate,
                image:result.secure_url
            })
            fs.unlinkSync(req.file.path);
            res.json({"status":"success",result:"Job Added Success"})
        }

    } catch (error) {
        res.json({"status":"error",message:error.message})
        
    }


}

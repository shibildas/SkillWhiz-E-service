const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs');
const adminModel =require('../Model/adminSchema')
const usermodel = require('../Model/userSchema')
const expertmodel=require("../Model/expertSchema")
const jobsmodel = require("../Model/jobsSchema")
const cloudinary = require('../Controller/config/cloudinaryConfig')

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
                res.json({"auth":false, "status": "failed", "message": "Invalid Credentials "})
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
module.exports.blockUser=async (req,res)=>{
    console.log(req.params.id);
    
    try {
        const _id= req.params.id
        await usermodel.findByIdAndUpdate({_id},{$set:{isBanned:true}})
        res.json({"status":"success",result:"Blocked the user"})
    } catch (error) {
        res.json({"status":"error",message:error.message})
    }
    
}
module.exports.unBlockUser=async (req,res)=>{
    try {
        const _id= req.params.id
        await usermodel.findByIdAndUpdate({_id},{$set:{isBanned:false}})
        res.json({"status":"success",result:"UnBlocked the user"})
    } catch (error) {
        res.json({"status":"error",message:error.message})
    }

}
module.exports.editUser=async(req,res)=>{
    try {
        const {name,email,mobile,id}=req.body
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path,{
                transformation: [{ width: 200, height: 200 }]})
                await usermodel.findByIdAndUpdate({_id:id},{
                    $set:{
                        username:name,
                        mobile:mobile,
                        email:email,
                        image:result.secure_url
                    }
                })
                fs.unlinkSync(req.file.path)
                res.json({"status":"success",result:"User edit Success"})
        }else{
            await usermodel.findByIdAndUpdate({_id:id},{
                $set:{
                    username:name,
                    mobile:mobile,
                    email:email,
                }
            })
            res.json({"status":"success",result:"User edit Success"})

        }
        
        
    } catch (error) {
        res.json({"status":"error",message:error.message}) 
    }
}

module.exports.unListJob=async (req,res)=>{
    try {
        const _id= req.params.id
        await jobsmodel.findByIdAndUpdate({_id},{$set:{listed:false}})
        res.json({"status":"success",result:"Unlisted the Job"})
    } catch (error) {
        res.json({"status":"error",message:error.message})
    }

}
module.exports.listJob=async (req,res)=>{
    try {
        const _id= req.params.id
        await jobsmodel.findByIdAndUpdate({_id},{$set:{listed:true}})
        res.json({"status":"success",result:"Listed the Job"})
    } catch (error) {
        res.json({"status":"error",message:error.message})
    }

}
module.exports.editJob=async(req,res)=>{
    try {
        const {id,role,bRate,adRate} = req.body
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path,{
                transformation: [{ width: 200, height: 200 }]})
                await jobsmodel.findByIdAndUpdate({_id:id},{
                    $set:{
                       job_role:role,
                       base_rate:bRate,
                       add_rate:adRate,
                       image:result.secure_url 
                    }
                })
                fs.unlinkSync(req.file.path)
                res.json({"status":"success",result:"Job edit Success"})
        }else{
            await jobsmodel.findByIdAndUpdate({_id:id},{
                $set:{
                   job_role:role,
                   base_rate:bRate,
                   add_rate:adRate,
                }
            })
            res.json({"status":"success",result:"Job edit Success"})

        }
        
    } catch (error) {
        res.json({"status":"error",message:error.message})
        
    }
}
module.exports.verifyExpert=async (req,res)=>{
    try {
        const _id= req.params.id
        await expertmodel.findByIdAndUpdate({_id},{$set:{identity:{status:"approved"}}})
        res.json({"status":"success",result:"Expert Approved"})
    } catch (error) {
        res.json({"status":"error",message:error.message})
    }

}
module.exports.rejectExpert=async (req,res)=>{
    try {
        const _id= req.params.id
        await expertmodel.findByIdAndUpdate({_id},{$set:{identity:{status:"initial"}}})
        res.json({"status":"success",result:"Expert rejected for reApply"})
    } catch (error) {
        res.json({"status":"error",message:error.message})
    }

}

module.exports.editExpert=async(req,res)=>{
    try {
        const {name,email,mobile,id}=req.body
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path,{
                transformation: [{ width: 200, height: 200 }]})
                await expertmodel.findByIdAndUpdate({_id:id},{
                    $set:{
                        username:name,
                        mobile:mobile,
                        email:email,
                        image:result.secure_url
                    }
                })
                fs.unlinkSync(req.file.path)
                res.json({"status":"success",result:"Expert edit Success"})
        }else{
            await expertmodel.findByIdAndUpdate({_id:id},{
                $set:{
                    username:name,
                    mobile:mobile,
                    email:email,
                }
            })
            res.json({"status":"success",result:"Expert edit Success"})

        }
        
        
    } catch (error) {
        res.json({"status":"error",message:error.message}) 
    }
}
module.exports.blockExpert= async (req,res)=>{
        try {
            const _id= req.params.id
            await expertmodel.findByIdAndUpdate({_id},{$set:{isBanned:true}})
            res.json({"status":"success",result:"Blocked the expert"})
        } catch (error) {
            res.json({"status":"error",message:error.message})
        }
        
    }
module.exports.unBlockExpert= async (req,res)=>{
        try {
            const _id= req.params.id
            await expertmodel.findByIdAndUpdate({_id},{$set:{isBanned:false}})
            res.json({"status":"success",result:"UnBlocked the expert"})
        } catch (error) {
            res.json({"status":"error",message:error.message})
        }
        
    }
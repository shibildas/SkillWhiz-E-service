const usermodel = require('../Model/userSchema')
const bcrypt = require('bcrypt')
const  jwt  = require("jsonwebtoken")
const jobsmodel = require('../Model/jobsSchema')
const authToken=process.env.TWILIO_AUTH_TOKEN
const accountSid = process.env.accountSid
const serviceSid =process.env.serviceSid
const client = require("twilio")(accountSid, authToken)


module.exports.postSignUp = async (req,res,next)=>{

    try {
        const {username,email,password,mobile} = req.body
        const user = await usermodel.findOne({email})
        const mob = await usermodel.findOne({mobile})
        if(user || mob){
            res.json({"status": "failed", "message": "User already exist login now" })
        }else{
            client.verify.v2.services(serviceSid).verifications.create({
                to:`+91${mobile}`,
                channel:"sms"
            }).then((ver)=> {
                console.log(ver.status) }      
            ).catch((error)=>{
                res.json({"status":"Sending failed", "message":error.message})
            })
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password.trim(), salt)
            await usermodel.create({
                username,
                email,
                mobile,
                password:hashPassword
            })
            res.json({ "status": "success", "message": "signup success" })

        }
        
    } catch (error) {
        res.json({"status": "failed", "message":error.message})
        
    }

}
module.exports.verifyOTP= async(req,res)=>{
    const {mobile,otp}= req.body
    try {
        const ver_check = await client.verify
          .v2.services(serviceSid)
          .verificationChecks.create({ to: `+91${mobile}`, code: otp });
        if (ver_check.status === "approved") {
          await usermodel.findOneAndUpdate(
            { mobile: mobile },
            { $set: { isBanned: false } }
          );
          res.json({
            status: "success",
            message: "Verified",
          });
        }
      } catch (error) {
        res.json({
          status: "error",
          message: error.message,
        });
      }


}
module.exports.signin= async(req,res)=>{

    const {mobile,password}=req.body
    const user = await usermodel.findOne({mobile:mobile})
    if(user){
        const isMatch =await bcrypt.compare(password,user.password)
        if(user.mobile===mobile && isMatch){
            if(!user.isBanned){

                const userId = user._id
                const token = jwt.sign({userId},process.env.JWT_SECRET_KEY,{expiresIn:30000})
                res.json({"auth":true, "token":token, "result":user,"status":"success"})
            }else{
                res.json({"auth":false, "status": "failed", "message": "You are blocked" })
            }
        }else{
            res.json({"auth":false, "status": "failed", "message": "credentials are incorrect" })
        }
    }else{
        res.json({"auth":false, "status": "failed", "message": "No user please register" })
    }
}

module.exports.isUserAuth = async (req, res) => {
    try {
    let userDetails = await usermodel.findById(req.userId)
    userDetails.auth=true;

    res.json({
        "mobile":userDetails.mobile,
        "username":userDetails.username,
        "email":userDetails.email,
        "auth":true,
        "image":userDetails.image||null
    })
    } catch (error) {
        
    }
    

}
module.exports.get7Jobs= async(req,res)=>{
    try {
        let jobs= await jobsmodel.find({listed:true}).sort({created_at: 1}).limit(7)
        res.json({"status":"success",result:jobs})
    } catch (error) {
        res.json({"status":"error",message:error.message})
        
    }
}
module.exports.changePassword=async(req,res)=>{
    const _id= req.userId
    const {old,newPass}=req.body
    try {
        let user = await usermodel.findById(_id)
        const isMatch =await bcrypt.compare(old,user.password) 

        if(isMatch){
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(newPass.trim(), salt)
            const userupdate=await usermodel.findByIdAndUpdate({_id},{$set:{password:hashPassword}})
            res.json({"status":"success","result":userupdate})

        }else{
            res.json({"status": "failed", "message": "credentials are incorrect" })
        }
    } catch (error) {
        res.json({"status":"error",message:error.message})
        
    }
}
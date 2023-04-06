const usermodel = require('../Model/userSchema')
const bcrypt = require('bcrypt')
const authToken=process.env.TWILIO_AUTH_TOKEN
const accountSid = process.env.accountSid
const serviceSid =process.env.serviceSid
const client = require("twilio")(accountSid, authToken)


module.exports.postSignUp = async (req,res,next)=>{

    try {
        const {username,email,password,mobile} = req.body
        const user = await usermodel.findOne({email})
        if(user){
            console.log(user);
            res.json({"status": "failed", "message": "Email already exist login now" })
        }else{
            client.verify.v2.services(serviceSid).verifications.create({
                to:`+91${mobile}`,
                channel:"sms"
            }).then((ver)=> console.log(ver.status)).catch((error)=>{
                res.json({"status":"failed", "message":error.message})
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
    console.log(req.body);
    const {mobile,otp}= req.body
    client.verify.v2.services(serviceSid).verificationChecks.create({to:`+91${mobile}`, code:otp})
    .then((ver_check)=>console.log(ver_check.status)).then(()=>res.json({
        "status":"success", "message":"Verified"
    }))
    await usermodel.findOneAndUpdate({
        mobile:mobile
    },{$set:{isBanned:false}})


}
module.exports.signin= async(req,res)=>{
    console.log(req.body);
    const {mobile,password}=req.body
    const user = await usermodel.findOne({mobile:mobile})
    if(user){
        const isMatch =await bcrypt.compare(password,user.password)
        if(user.mobile===mobile && isMatch){
            cont userId = user._id
        }
    }
}
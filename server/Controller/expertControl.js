const expertmodel = require("../Model/expertSchema")
const authToken=process.env.TWILIO_AUTH_TOKEN
const accountSid = process.env.accountSid
const serviceSid = process.env.serviceSid
const bcrypt = require("bcrypt")
const usermodel = require("../Model/userSchema")

const client=require("twilio")(accountSid,authToken)


module.exports.postregister = async(req,res,next)=>{
try {
    const {username,email,password,mobile}=req.body
    const user= await expertmodel.findOne({email})
    const mob= await expertmodel.findOne({mobile})
    if(user || mob){
        res.json({"status": "failed", "message": "User already exist login now" })
    }else{
        client.verify.v2.services(serviceSid).verifications.create({
            to:`+91${mobile}`,
            channel:"sms"
        }).then((ver)=>{
            console.log(ver);
        }
        ).catch((error)=>{
            res.json({"status":"failed", "message":error.message})
        })
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password.trim(), salt)
        await expertmodel.create({
            username,
            email,
            password:hashPassword,
            mobile
        })
        res.json({ "status": "success", "message": "signup success" })
    }
    
} catch (error) {
    res.json({"status": "failed", "message":error.message})
}
}

module.exports.verify = async(req,res)=>{
    console.log(req.body);
    const {mobile,otp}= req.body
    try {
        const ver_check = await client.verify
          .v2.services(serviceSid)
          .verificationChecks.create({ to: `+91${mobile}`, code: otp });
        console.log(ver_check.status);
        if (ver_check.status === "approved") {
          await expertmodel.findOneAndUpdate(
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
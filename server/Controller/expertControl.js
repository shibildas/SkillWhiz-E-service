const expertmodel = require("../Model/expertSchema")
const authToken=process.env.TWILIO_AUTH_TOKEN
const accountSid = process.env.accountSid
const serviceSid = process.env.serviceSid
const bcrypt = require("bcrypt")
const jwt= require('jsonwebtoken')
const client=require("twilio")(accountSid,authToken)
const cloudinary = require('../Controller/config/cloudinaryConfig')


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
   
    const {mobile,otp}= req.body
    try {
        const ver_check = await client.verify
          .v2.services(serviceSid)
          .verificationChecks.create({ to: `+91${mobile}`, code: otp });
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

module.exports.signin= async(req,res)=>{

  const {mobile,password}=req.body
  const expert = await expertmodel.findOne({mobile:mobile})
  if(expert){
      const isMatch =await bcrypt.compare(password,expert.password)
      if(expert.mobile===mobile && isMatch){
          if(!expert.isBanned){

              const expertId = expert._id
              const token = jwt.sign({expertId},process.env.JWT_SECRET_KEY,{expiresIn:30000})
              res.json({"auth":true, "experttoken":token, "result":expert,"status":"success"})
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

module.exports.isExpertAuth = async (req, res) => {
  try {
  let expertDetails = await expertmodel.findById(req.expertId)
  expertDetails.auth=true;

  res.json({
      "mobile":expertDetails.mobile,
      "username":expertDetails.username,
      "email":expertDetails.email,
      "auth":true,
      "image":expertDetails.image||null,
      "isVerified":expertDetails.isVerified
  })
  } catch (error) {
      console.log(error);
  }
  

}

module.exports.applyVerify = async (req, res) => {
  
  try {
    const expertId = req.expertId;
    const files= Object.values(req.files).flatMap((val)=>val)
    const promises = files.map(async file => {
      const result = await cloudinary.uploader.upload(file.path, {
        transformation: [{ width: 200, height: 100 }]
      });
      return result.secure_url;
    });

    const [frontImage, backImage] = await Promise.all(promises);

    await expertmodel.findByIdAndUpdate(expertId,{
      $set: {
        "identity.name": req.body.name,
        "identity.front": frontImage,
        "identity.back": backImage,
        "identity.status": "pending",
        "isVerified": true
      }
    });

    res.json({ "status": "success", "message": "Verification applied successfully" });
  } catch (error) {
    console.log(error);
    res.json({ "status": "error", "message": error.message });
  }
};

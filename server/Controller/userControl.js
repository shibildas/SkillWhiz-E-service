const usermodel = require("../Model/userSchema");
const bcrypt = require("bcrypt");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const jobsmodel = require("../Model/jobsSchema");
const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = process.env.accountSid;
const serviceSid = process.env.serviceSid;
const client = require("twilio")(accountSid, authToken);
const cloudinary = require("../Controller/config/cloudinaryConfig");
const expertmodel = require("../Model/expertSchema");
const bookingmodel= require('../Model/bookingSchema');
const Razorpay = require('razorpay')
const crypto = require('crypto');
const { default: mongoose } = require("mongoose");
const reviewmodel = require("../Model/reviewSchema");

module.exports.postSignUp = async (req, res, next) => {
  try {
    const { username, email, password, mobile } = req.body;
    const user = await usermodel.findOne({ email });
    const mob = await usermodel.findOne({ mobile });
    if (user || mob) {
      res.json({ status: "failed", message: "User already exist login now" });
    } else {
      client.verify.v2
        .services(serviceSid)
        .verifications.create({
          to: `+91${mobile}`,
          channel: "sms",
        })
        .then((ver) => {
          console.log(ver.status);
        })
        .catch((error) => {
          res.json({ status: "Sending failed", message: error.message });
        });
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password.trim(), salt);
      await usermodel.create({
        username,
        email,
        mobile,
        password: hashPassword,
      });
      res.status(201).json({ status: "success", message: "signup success" });
    }
  } catch (error) {
    res.status(400).json({ status: "failed", message: error.message });
  }
};
module.exports.verifyOTP = async (req, res) => {
  const { mobile, otp } = req.body;
  try {
    const ver_check = await client.verify.v2
      .services(serviceSid)
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
};
module.exports.signin = async (req, res) => {
  const { mobile, password } = req.body;
  const user = await usermodel.findOne({ mobile: mobile }).populate({ path: 'vouchers', select: '-users' })
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (user.mobile === mobile && isMatch) {
      if (!user.isBanned) {
        const userId = user._id;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
          expiresIn: 30000,
        });
        res.json({ auth: true, token: token, result: user, status: "success" });
      } else {
        res.json({ auth: false, status: "failed", message: "You are blocked" });
      }
    } else {
      res.json({
        auth: false,
        status: "failed",
        message: "credentials are incorrect",
      });
    }
  } else {
    res.json({
      auth: false,
      status: "failed",
      message: "No user please register",
    });
  }
};

module.exports.isUserAuth = async (req, res) => {
  try {
    let userDetails = await usermodel.findById(req.userId).populate({ path: 'vouchers', select: '-users' });
    userDetails.auth = true;

    res.json({
      "auth": true,
      _id:userDetails._id,
      mobile: userDetails.mobile,
      username: userDetails.username,
      email: userDetails.email,
      image: userDetails.image || null,
      loyality:userDetails?.loyality || 0,
      vouchers:userDetails?.vouchers || []
    });
  } catch (error) {
    res.json({auth:false, status: "error", message: error.message });
  }
};
module.exports.get7Jobs = async (req, res) => {
  try {
    let jobs = await jobsmodel
      .find({ listed: true })
      .sort({ created_at: 1 })
      .limit(7);
    res.json({ status: "success", result: jobs });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};
module.exports.changePassword = async (req, res) => {
  const _id = req.userId;
  const { old, newPass } = req.body;
  try {
    let user = await usermodel.findById(_id);
    const isMatch = await bcrypt.compare(old, user.password);

    if (isMatch) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPass.trim(), salt);
      const userupdate = await usermodel.findByIdAndUpdate(
        { _id },
        { $set: { password: hashPassword } }
      );
      res.json({ status: "success", result: userupdate });
    } else {
      res.json({ status: "failed", message: "credentials are incorrect" });
    }
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

module.exports.reVerify = async (req, res) => {
  try {
    const { mobile } = req.body;
    const user = await usermodel.findOne({ mobile: mobile });
    if (user) {
      res.json({ status: "error", message: "Mobile Number Already Exists" });
    } else {
      client.verify.v2
        .services(serviceSid)
        .verifications.create({
          to: `+91${mobile}`,
          channel: "sms",
        })
        .then((ver) => {
          console.log(ver.status);
        })
        .catch((error) => {
          res.json({ status: "Sending failed", message: error.message });
        });
      res.json({ status: "success", message: "SMS Sent Successfully" });
    }
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};
module.exports.reVerify_OTP = async (req, res) => {
  try {
    const _id = req.userId;
    const { mobile, otp } = req.body;
    const ver_check = await client.verify.v2
      .services(serviceSid)
      .verificationChecks.create({ to: `+91${mobile}`, code: otp });
    if (ver_check.status === "approved") {
      await usermodel.findByIdAndUpdate({ _id }, { $set: { mobile: mobile } });
      const user = await usermodel.findById(_id);
      res.json({
        status: "success",
        message: "Verified",
        result: user,
      });
    }
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};
module.exports.editProfile = async (req, res) => {
  try {
    const _id = req.userId;
    const { email, name } = req.body;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        format: "WebP",
        transformation: [{ width: 200, height: 200 }],
      });
      await usermodel.findByIdAndUpdate(
        { _id: _id },
        {
          $set: {
            username: name,
            email: email,
            image: result.secure_url,
          },
        }
      );
      fs.unlinkSync(req.file.path);
    } else {
      await usermodel.findByIdAndUpdate(
        { _id: _id },
        {
          $set: {
            username: name,
            email: email,
          },
        }
      );
    }
    const data = await usermodel.findById({ _id });
    res.json({
      status: "success",
      message: "Profile edit Success",
      result: data,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};
module.exports.getJob = async (req, res) => {
  try {
    const job_role = req.params.id;
    const job = await jobsmodel.findOne({ job_role });
    const reviews= await reviewmodel.find({jobId:job._id, reviewModel:'user'}).populate('reviewBy','username image' ).limit(10)
    const jobWithReviews = Object.assign({}, job.toObject(), { reviews })
    res.json({ status: "success", result: jobWithReviews});
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};
module.exports.getSlotsofJob = async (req, res) => {
  try {
    const id = req.params.id;
    const jobDetail= await jobsmodel.findById({_id:id})
    const expertDetails = await expertmodel
      .find({ skills: { $all: id } })
      .select("slots");
    const allSlots = expertDetails.flatMap((expert) => expert.slots);
    const uniqueSlots = [...new Set(allSlots)];
    res.json({ status: "success", result: uniqueSlots,job:jobDetail });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

module.exports.addAddress= async(req,res)=>{
  try {
    const _id =req.userId
    const {name,house,street,pincode}= req.body
    const address= {name,house,street,pincode}
    const user= await usermodel.findByIdAndUpdate({_id},{$addToSet:{address:{$each:[address]}}})
    res.json({"status":"success","message":"Address Added"})
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: error.message });
  }
}
module.exports.getAddress= async (req,res)=>{
  try{
    
    const _id =req.userId
    const address= await usermodel.findById({_id},{address:1})

    res.json({"status":"success",result:address.address})
  }catch(error){
    
    res.json({ status: "error", message: error.message });
  }
  
  
}
module.exports.bookJob=async(req,res)=>{
  try {
    const {time,address,date,jobId}=req.body
    const userId =req.userId
    const expert = await expertmodel.findOne({
      skills:{$in:[jobId]},
      slots:{$in:[time]}
    })
    if(!expert){
      console.log("no Expert");
      res.json({"status":"error","message":"no expert available"})
    }else{
      const updatedExpert= await expertmodel.findOneAndUpdate(
        {_id:expert._id},
        {
          $pull:{slots:time},
          $addToSet:{bookedSlots:time}
        },
        {new:true}
      )
      if(updatedExpert){
        const booking =await bookingmodel.create({
          userId:userId,
          jobId:jobId,
          expertId:expert._id,
          slot:time,
          booking_date:date,
          address:{
            name:address.name,
            house:address.house,
            street:address.street,
            pincode:address.pincode
            
          }

        })

        console.log(booking);
        res.json({"status":"success",result:booking?._id})
      }
    }
    
  } catch (error) {
    
    res.json({ status: "error", message: error.message });
  }
}

module.exports.bookings=async(req,res)=>{
  try {
    const id=req.params.id
    const booking= await bookingmodel.findOne({_id:id}).populate('userId', '-password').populate({path:'voucherId',select:'-users'})
    .populate('expertId', '-password')
    .populate('jobId')
    .select('-userId.password -expertId.password')
    const userId=booking.userId._id
    const review= await reviewmodel.findOne({bookId:id,reviewBy:userId}).select('rating message')
    res.json({ status: "success", result: {...booking?.toObject(),review:review?.toObject()} });
  } catch (error) {
    res.json({ status: "error", message: error.message });
    
  }
}

module.exports.myBookings=async(req,res)=>{
  try {
    const id=req.userId
    const bookings= await bookingmodel.find({userId:id}).populate('jobId')
    if (bookings){
      res.json({"status":"success",result:bookings})

    }else{

      res.json({ status: "error", message: "No Result" });
    }
  } catch (error) {
    res.json({ status: "error", message: error.message });
    
  }
}

module.exports.onlinePayment=async(req,res)=>{
  try {
    const instance=new Razorpay({
      key_id:process.env.key_id,
      key_secret:process.env.key_secret
    })
    const options={
      amount:req.body.amount*100,
      currency:"INR",
      receipt: crypto.randomBytes(10).toString('hex')
    }
    instance.orders.create(options,(error,order)=>{
      if(error){
        console.log(error.message);
        return res.status(500).json({message:"Something went Wrong"})
      }else{
        res.status(200).json({data:order})
      }
    })
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:error.message})
    
  }

}
module.exports.verifyPayment=async(req,res)=>{
  try {
    const{
      bookId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    }=req.body
    const sign = razorpay_order_id+"|"+razorpay_payment_id
    const expectedSign = crypto.createHmac("sha256",process.env.key_secret).update(sign.toString()).digest('hex')
    console.log(expectedSign);
    console.log(razorpay_signature);
    if(razorpay_signature===expectedSign){
      const booking= await bookingmodel.findOneAndUpdate({_id:bookId},{$set:{status:"invoiced",
      'payment.payment_method':"online",
      'payment.payment_id':razorpay_payment_id,
      'payment.payment_status':"success",
    }})
      return res.status(200).json({message:"Payment verified successfully"})

    }else{
      return res.status(400).json({message:"invalid Signature"})
    }
  } catch (error) {
    return res.status(500).json({message:error.message})
    
  }
}

module.exports.getContacts=async(req,res)=>{
  try {
    const id=req.userId
    const pipeline = [
      {
        $match: { userId: new mongoose.Types.ObjectId(id) }
      },
      {
        $lookup: {
          from: 'experts',
          localField: 'expertId',
          foreignField: '_id',
          as: 'expert'
        }
      },
      {
        $unwind: '$expert'
      },
      {
        $group: {
          _id: '$_id',
          id:{
            $first:'$expert._id'
          },
          email: {
            $first: '$expert.email'
          },
          username: {
            $first: '$expert.username'
          },
          mobile: {
            $first: '$expert.mobile'
          },
          image: {
            $first: '$expert.image'
          },
          bookingId: {
            $first: '$_id'
          }
        }
      },
      {
        $group: {
          _id: '$email',
          id:{
            $first:'$id'
          },
          email: {
            $first: '$email'
          },
          username: {
            $first: '$username'
          },
          mobile: {
            $first: '$mobile'
          },
          image: {
            $first: '$image'
          },
          bookings: {
            $push: {
              bookingId: '$bookingId'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          id:1,
          email: 1,
          username: 1,
          mobile: 1,
          image: 1,
          bookings: 1
        }
      }
    ];
const bookings = await bookingmodel.aggregate(pipeline);

    res.json({"status":"success",result:[...bookings]})
  } catch (error) {
     res.status(500).json({message:error.message})
  }
}

module.exports.redeemVoucher=async(req,res)=>{
  try {
    const userId=req.userId
    const {id,points}=req.body
    const updatedUser=await usermodel.findOneAndUpdate( { _id: userId, vouchers: { $ne: id } },
      {$addToSet: { vouchers: id },$inc:{loyality:-points}},{new:true}).populate({ path: 'vouchers', select: '-users' }).select('-password')
      if(updatedUser){

        res.status(201).json({"status":"success",result:updatedUser})
      }else{
        res.status(200).json({"status":"error",message:"already used"})
        
      }
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}
module.exports.verifyCancel= async(req,res)=>{
  try {
    const{
      bookId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    }=req.body
    const sign = razorpay_order_id+"|"+razorpay_payment_id
    const expectedSign = crypto.createHmac("sha256",process.env.key_secret).update(sign.toString()).digest('hex')

    if(razorpay_signature===expectedSign){
      const booking= await bookingmodel.findOneAndUpdate({_id:bookId},{$set:{status:'cancelled','payment.payment_method':"online",
      'payment.payment_id':razorpay_payment_id,
      'payment.payment_status':"success",}})
      return res.status(200).json({message:"Payment verified successfully"})

    }else{
      return res.status(400).json({message:"invalid Signature"})
    }
  } catch (error) {
    return res.status(500).json({message:error.message})
    
  }
}

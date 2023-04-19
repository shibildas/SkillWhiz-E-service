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
      res.json({ status: "success", message: "signup success" });
    }
  } catch (error) {
    res.json({ status: "failed", message: error.message });
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
  const user = await usermodel.findOne({ mobile: mobile });
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
    let userDetails = await usermodel.findById(req.userId);
    userDetails.auth = true;

    res.json({
      mobile: userDetails.mobile,
      username: userDetails.username,
      email: userDetails.email,
      auth: true,
      image: userDetails.image || null,
    });
  } catch (error) {}
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
    res.json({ status: "success", result: job });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};
module.exports.getSlotsofJob = async (req, res) => {
  try {
    const _id = req.params.id;
    const slots = await expertmodel.aggregate([
        {
            $lookup: {
              from: "jobs",
              localField: "skills",
              foreignField: "_id",
              as: "jobs"
            }
          },
          { $unwind: "$jobs" },
          { $match: { "jobs._id": _id } },
        
          // Unwind the slots array to get each slot as a separate document
          { $unwind: "$slots" },
        
          // Join the bookedSlots array with the _id field of the slots array
          { $lookup: { from: "experts", localField: "bookedSlots", foreignField: "slots", as: "bookedSlots" } },
          { $unwind: { path: "$bookedSlots", preserveNullAndEmptyArrays: true } },
        
          // Filter out slots that have been booked by experts
          { $match: { "bookedSlots.slots": { $ne: "$slots" } } },
        
          // Group by the slot and collect the distinct expert IDs who have the slot
          { $group: { _id: "$slots", expertIds: { $addToSet: "$_id" } } },
        
          // Project the slot and expert count
          { $project: { _id: 1, count: { $size: "$expertIds" } } },
        
          // Filter out slots that have only one expert
          { $match: { count: { $gt: 1 } } },
        
          // Sort the available slots by date
          { $sort: { _id: 1 } }
    ]);
    res.json({ status: "success", result: slots });
    console.log(slots);
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

const expertmodel = require("../Model/expertSchema");
const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = process.env.accountSid;
const serviceSid = process.env.serviceSid;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("twilio")(accountSid, authToken);
const cloudinary = require("../Controller/config/cloudinaryConfig");
const jobsmodel = require("../Model/jobsSchema");
const fs = require("fs");
const bookingmodel = require("../Model/bookingSchema");
const { default: mongoose } = require("mongoose");
const reviewmodel = require("../Model/reviewSchema");

module.exports.postregister = async (req, res, next) => {
  try {
    const { username, email, password, mobile } = req.body;
    const user = await expertmodel.findOne({ email });
    const mob = await expertmodel.findOne({ mobile });
    if (user || mob) {
      res.status(304).json({ status: "exists", message: "User already exist login now" });
    } else {
      client.verify.v2
        .services(serviceSid)
        .verifications.create({
          to: `+91${mobile}`,
          channel: "sms",
        })
        .then((ver) => {
          console.log(ver);
        })
        .catch((error) => {
          res.status(401).json({ status: "failed", message: error.message });
        });
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password.trim(), salt);
      await expertmodel.create({
        username,
        email,
        password: hashPassword,
        mobile,
      });
      res.status(201).json({ status: "success", message: "signup success" });
    }
  } catch (error) {
    res.status(401).json({ status: "failed", message: error.message });
  }
};

module.exports.verify = async (req, res) => {
  const { mobile, otp } = req.body;
  try {
    const ver_check = await client.verify.v2
      .services(serviceSid)
      .verificationChecks.create({ to: `+91${mobile}`, code: otp });
    if (ver_check.status === "approved") {
      const expert = await expertmodel.findOneAndUpdate(
        { mobile: mobile },
        { $set: { isBanned: false } }
      );
      const expertId = expert._id;
      const token = jwt.sign({ expertId }, process.env.JWT_SECRET_KEY, {
        expiresIn: 30000,
      });
      res.json({
        auth: true,
        experttoken: token,
        result: expert,
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
  try {
    
  
  const { mobile, password } = req.body;
  const expert = await expertmodel.findOne({ mobile: mobile });
  if (expert) {
    const isMatch = await bcrypt.compare(password, expert.password);
    if (expert.mobile === mobile && isMatch) {
      if (!expert.isBanned) {
        const expertId = expert._id;
        const token = jwt.sign({ expertId }, process.env.JWT_SECRET_KEY, {
          expiresIn: 30000,
        });
        res.status(201).json({
          auth: true,
          experttoken: token,
          result: expert,
          status: "success",
        });
      } else {
        res.status(304).json({ auth: false, status: "banned", message: "You are blocked" });
      }
    } else {
      res.status(302).json({
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
} catch (error) {
    
}
};
module.exports.reset = async (req, res) => {
  try {
    const { mobile } = req.body;
    const expert = await expertmodel.findOne({ mobile: mobile });
    if (expert) {
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
          res.status(401).json({ status: "Sending failed", message: error.message });
        });
      res.status(201).json({ status: "success" });
    } else {
      res.status(304).json({ status: "failed", message: "mobile not registersed" });
    }
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
};
module.exports.updatePass = async (req, res) => {
  try {
    const { password } = req.body;
    const _id = req.expertId;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password.trim(), salt);
    const expertupdate = await expertmodel.findByIdAndUpdate(
      { _id },
      { $set: { password: hashPassword } }
    );
    res.json({ status: "success", result: expertupdate });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

module.exports.isExpertAuth = async (req, res) => {
  try {
    let expertDetails = await expertmodel.findById(req.expertId);
    expertDetails.auth = true;
    if(!expertDetails.isBanned){
    if (expertDetails.identity.status === "approved") {
      res.json({
        _id: expertDetails._id,
        mobile: expertDetails.mobile,
        username: expertDetails.username,
        email: expertDetails.email,
        auth: true,
        verified: true,
        identity: expertDetails.identity?.reason,
        image: expertDetails.image || null,
        isVerified: expertDetails.isVerified,
      });
    } else {
      res.json({
        mobile: expertDetails.mobile,
        username: expertDetails.username,
        email: expertDetails.email,
        auth: true,
        verified: false,
        image: expertDetails.image || null,
        isVerified: expertDetails.isVerified,
        identity: expertDetails.identity?.reason,
      });
    }}else{
      res.json({ auth: false, message: "You are Blocked" });
    }
  } catch (error) {
    res.json({ auth: false, message: error.message });
  }
};

module.exports.applyVerify = async (req, res) => {
  try {
    const expertId = req.expertId;
    const files = Object.values(req.files).flatMap((val) => val);
    const promises = files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        format: "WebP",
        transformation: [{ width: 200, height: 100 }],
      });
      return result.secure_url;
    });

    const [frontImage, backImage] = await Promise.all(promises);

    await expertmodel.findByIdAndUpdate(expertId, {
      $set: {
        "identity.name": req.body.name,
        "identity.front": frontImage,
        "identity.back": backImage,
        "identity.status": "pending",
        isVerified: true,
      },
    });

    res.json({
      status: "success",
      message: "Verification applied successfully",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

module.exports.getAllJobs = async (req, res) => {
  try {
    const id = req.expertId;
    const expert = await expertmodel.findOne({ _id: id });
    const jobs = await jobsmodel.find({
      _id: { $nin: expert.skills },
      listed: true,
    });
    res.json({ status: "success", result: jobs });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

module.exports.addSkill = async (req, res) => {
  try {
    const _id = req.expertId;
    const { skills } = req.body;
    await expertmodel.findOneAndUpdate(
      { _id },
      { $addToSet: { skills: { $each: [...skills] } } }
    );
    res.json({ status: "success" });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};
module.exports.getMyJobs = async (req, res) => {
  try {
    const _id = req.expertId;
    const user = await expertmodel.findById({ _id }).populate("skills");
    const skills = user.skills;
    if (skills.length != 0) {
      res.json({ status: "success", result: skills });
    }
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

module.exports.removeSkill = async (req, res) => {
  try {
    const skillId = req.params.id;
    const _id = req.expertId;
    const user = await expertmodel.updateOne(
      { _id },
      { $pull: { skills: skillId } }
    );
    res.json({ status: "success", result: user });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

module.exports.changePassword = async (req, res) => {
  const _id = req.expertId;
  const { old, newPass } = req.body;
  try {
    let user = await expertmodel.findById(_id);
    const isMatch = await bcrypt.compare(old, user.password);

    if (isMatch) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPass.trim(), salt);
      const userupdate = await expertmodel.findByIdAndUpdate(
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
    const user = await expertmodel.findOne({ mobile: mobile });
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
      res.json({ status:"success", message: "SMS Sent Successfully" });
    }
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};
module.exports.reVerify_OTP = async (req, res) => {
  try {
    const _id = req.expertId;
    const { mobile, otp } = req.body;
    const ver_check = await client.verify.v2
      .services(serviceSid)
      .verificationChecks.create({ to: `+91${mobile}`, code: otp });
    if (ver_check.status === "approved") {
      await expertmodel.findByIdAndUpdate({ _id }, { $set: { mobile: mobile } });
      const user = await expertmodel.findById(_id);
      res.json({
        status: "success",
        message: "Verified",
        result: user,
      });
    }else{
      res.json({status:"error"})
    }
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};
module.exports.editProfile = async (req, res) => {
  try {
    const _id = req.expertId;
    const { email, name } = req.body;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        transformation: [{ width: 200, height: 200 }],
      });
      await expertmodel.findByIdAndUpdate(
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
      await expertmodel.findByIdAndUpdate(
        { _id: _id },
        {
          $set: {
            username: name,
            email: email,
          },
        }
      );
    }
    const data = await expertmodel.findById({ _id });
    res.json({
      status: "success",
      message: "Profile edit Success",
      result: data,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

module.exports.addSchedule = async (req, res) => {
  try {
    const _id = req.expertId;
    const { dates } = req.body;
    const expert = await expertmodel.findByIdAndUpdate(
      { _id: _id },
      { $addToSet: { slots: { $each: [...dates] } } }
    );
    res.json({ status: "success", message: "Slots Added Successfully" });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

module.exports.getSchedule = async (req, res) => {
  try {
    const _id = req.expertId;
    const schedules = await expertmodel.findById(_id, {
      slots: 1,
      bookedSlots: 1,
    });
    res.json({ status: "success", result: schedules });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

module.exports.getAppointments = async (req, res) => {
  try {
    const id = req.expertId;
    const bookings = await bookingmodel
      .find({ expertId: id })
      .populate("jobId");
    res.json({ status: "success", result: bookings });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

module.exports.getBookings = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await bookingmodel
      .findOne({ _id: id })
      .populate("userId", "-password")
      .populate("expertId", "-password")
      .populate("jobId")
      .select(
        "-userId.password -expertId.password -expertId.slots -estimate.parts._id"
      );
    const expertId = booking.expertId._id;
    const review = await reviewmodel
      .findOne({ bookId: id, reviewBy: expertId })
      .select("rating message");
    res.json({
      status: "success",
      result: { ...booking?.toObject(), review: review?.toObject() },
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};
module.exports.startJob = async (req, res) => {
  try {
    const id = req.params.id;
    const time = Date.now();
    const booking = await bookingmodel.findOneAndUpdate(
      { _id: id },
      { $set: { status: "started", jobStart: time } }
    );
    if (booking) {
      res.json({ status: "success" });
    } else {
      res.json({ status: "error" });
    }
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};
module.exports.getContacts = async (req, res) => {
  try {
    const id = req.expertId;
    const pipeline = [
      {
        $match: { expertId: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $group: {
          _id: "$_id",
          id: {
            $first: "$user._id",
          },
          email: {
            $first: "$user.email",
          },
          username: {
            $first: "$user.username",
          },
          mobile: {
            $first: "$user.mobile",
          },
          image: {
            $first: "$user.image",
          },
          bookingId: {
            $first: "$_id",
          },
        },
      },
      {
        $group: {
          _id: "$email",
          id: {
            $first: "$id",
          },
          email: {
            $first: "$email",
          },
          username: {
            $first: "$username",
          },
          mobile: {
            $first: "$mobile",
          },
          image: {
            $first: "$image",
          },
          bookings: {
            $push: {
              bookingId: "$bookingId",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          id: 1,
          email: 1,
          username: 1,
          mobile: 1,
          image: 1,
          bookings: 1,
        },
      },
    ];
    const bookings = await bookingmodel.aggregate(pipeline);
    res.json({ status: "success", result: bookings });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

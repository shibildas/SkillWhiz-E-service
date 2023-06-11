const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const adminModel = require("../Model/adminSchema");
const usermodel = require("../Model/userSchema");
const expertmodel = require("../Model/expertSchema");
const jobsmodel = require("../Model/jobsSchema");
const cloudinary = require("../Controller/config/cloudinaryConfig");
const bookingmodel = require("../Model/bookingSchema");
const vouchermodel = require("../Model/voucherSchema");

module.exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email: email });
    if (admin) {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (admin.email === email && isMatch) {
        const token = jwt.sign(
          { adminID: admin._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "5d" }
        );
        const admindetails = {
          email: admin.email,
        };
        res.json({
          auth: true,
          token: token,
          result: admindetails,
          status: "success",
          message: "signin success",
        });
      } else {
        res.json({
          auth: false,
          status: "failed",
          message: "Invalid Credentials ",
        });
      }
    } else {
      res.json({ auth: false, status: "failed", message: "No Admin found" });
    }
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports.isAdminAuth = async (req, res) => {
  try {
    let admin = await adminModel.findById(req.adminId);

    const admindetails = {
      email: admin.email,
    };
    res.json({
      auth: true,
      result: admindetails,
      status: "success",
      message: "signin success",
    });
  } catch (error) {
    res.status(400).json({ auth: false, message: error.message });
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const users = await usermodel.find({});
    res.json({ status: "success", result: users });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports.addUsers = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await usermodel.findOne({ email });
    if (user) {
      res.json({ status: "failed", message: "Email already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password.trim(), salt);
      await usermodel.create({
        username,
        email,
        password: hashPassword,
      });
      res.json({ status: "success", message: "user add success" });
    }
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports.getExperts = async (req, res) => {
  try {
    const experts = await expertmodel.find({}).populate("skills");
    res.json({ status: "success", result: experts });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports.getJobs = async (req, res) => {
  try {
    const jobs = await jobsmodel.find({});
    res.json({ status: "success", result: jobs });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports.addJobs = async (req, res) => {
  try {
    const job_role = req.body.job?.toLowerCase();
    const job = await jobsmodel.findOne({ job_role: job_role });
    if (job) {
      res
        .status(400)
        .json({ status: "error", message: "Job Name Already Exist" });
    } else {
      const result = await cloudinary.uploader.upload(req.file.path, {
        format: "WebP",
        transformation: [{ width: 200, height: 200 }],
      });
      const job = await jobsmodel.create({
        job_role: req.body.job,
        base_rate: req.body.bRate,
        add_rate: req.body.adRate,
        image: result.secure_url,
      });
      res.status(201).json({ status: "success", result: "Job Added Success" });
      if (job) {
        fs.unlinkSync(req?.file?.path);
      }
    }
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports.blockUser = async (req, res) => {
  try {
    const _id = req.params.id;
    await usermodel.findByIdAndUpdate({ _id }, { $set: { isBanned: true } });
    res.json({ status: "success", result: "Blocked the user" });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports.unBlockUser = async (req, res) => {
  try {
    const _id = req.params.id;
    await usermodel.findByIdAndUpdate({ _id }, { $set: { isBanned: false } });
    res.json({ status: "success", result: "UnBlocked the user" });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports.editUser = async (req, res) => {
  try {
    const { name, email, mobile, id } = req.body;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        format: "WebP",
        transformation: [{ width: 200, height: 200 }],
      });
      await usermodel.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            username: name,
            mobile: mobile,
            email: email,
            image: result.secure_url,
          },
        }
      );
      fs.unlinkSync(req.file.path);
      res.status(201).json({ status: "success", result: "User edit Success" });
    } else {
      await usermodel.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            username: name,
            mobile: mobile,
            email: email,
          },
        }
      );
      res.status(201).json({ status: "success", result: "User edit Success" });
    }
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports.unListJob = async (req, res) => {
  try {
    const _id = req.params.id;
    await jobsmodel.findByIdAndUpdate({ _id }, { $set: { listed: false } });
    res.json({ status: "success", result: "Unlisted the Job" });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports.listJob = async (req, res) => {
  try {
    const _id = req.params.id;
    await jobsmodel.findByIdAndUpdate({ _id }, { $set: { listed: true } });
    res.json({ status: "success", result: "Listed the Job" });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports.editJob = async (req, res) => {
  try {
    const { id, role, bRate, adRate } = req.body;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        format: "WebP",
        transformation: [{ width: 200, height: 200 }],
      });
      await jobsmodel.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            job_role: role,
            base_rate: bRate,
            add_rate: adRate,
            image: result.secure_url,
          },
        }
      );
      fs.unlinkSync(req.file.path);
      res.json({ status: "success", result: "Job edit Success" });
    } else {
      await jobsmodel.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            job_role: role,
            base_rate: bRate,
            add_rate: adRate,
          },
        }
      );
      res.json({ status: "success", result: "Job edit Success" });
    }
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports.verifyExpert = async (req, res) => {
  try {
    const _id = req.params.id;
    await expertmodel.findByIdAndUpdate(
      { _id },
      { $set: { identity: { status: "approved", reason: "" } } }
    );
    res.json({ status: "success", result: "Expert Approved" });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports.rejectExpert = async (req, res) => {
  try {
    const _id = req.params.id;
    const { reason } = req.body;
    await expertmodel.findByIdAndUpdate(
      { _id },
      {
        $set: {
          identity: { status: "initial", reason: reason },
          isVerified: false,
        },
      }
    );
    res.json({ status: "success", result: "Expert rejected for reApply" });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports.editExpert = async (req, res) => {
  try {
    const { name, email, mobile, id } = req.body;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        format: "WebP",
        transformation: [{ width: 200, height: 200 }],
      });
      await expertmodel.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            username: name,
            mobile: mobile,
            email: email,
            image: result.secure_url,
          },
        }
      );
      fs.unlinkSync(req.file.path);
      res.json({ status: "success", result: "Expert edit Success" });
    } else {
      await expertmodel.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            username: name,
            mobile: mobile,
            email: email,
          },
        }
      );
      res.json({ status: "success", result: "Expert edit Success" });
    }
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports.blockExpert = async (req, res) => {
  try {
    const _id = req.params.id;
    await expertmodel.findByIdAndUpdate({ _id }, { $set: { isBanned: true } });
    res.json({ status: "success", result: "Blocked the expert" });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports.unBlockExpert = async (req, res) => {
  try {
    const _id = req.params.id;
    await expertmodel.findByIdAndUpdate({ _id }, { $set: { isBanned: false } });
    res.json({ status: "success", result: "UnBlocked the expert" });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports.getSchedule = async (req, res) => {
  try {
    const _id = req.params.id;
    const schedules = await expertmodel.findById(_id, { slots: 1 });
    res.json({ status: "success", result: schedules.slots });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports.addSchedule = async (req, res) => {
  try {
    const { dates, _id } = req.body;
    const expert = await expertmodel.findByIdAndUpdate(
      { _id },
      { $addToSet: { slots: { $each: [...dates] } } }
    );
    res.json({ status: "success", message: "Slots Added Successfully" });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports.bookings = async (req, res) => {
  try {
    const bookings = await bookingmodel
      .find()
      .populate("jobId")
      .select("-address");
    if (bookings) {
      res.json({ status: "success", result: bookings });
    } else {
      res.json({ ststus: "error" });
    }
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports.manageBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await bookingmodel
      .findOne({ _id: id })
      .populate("userId", "-password")
      .populate("expertId", "-password -slots -bookedSlots")
      .populate("jobId")
      .select(
        "-userId.password -expertId.password -expertId.slots -estimate.parts._id"
      );
    res.json({ status: "success", result: booking });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports.managePayment = async (req, res) => {
  try {
    const { bookId, transId } = req.body;
    const booking = await bookingmodel.findOneAndUpdate(
      { _id: bookId },
      {
        $set: {
          status: "invoiced",
          "payment.payment_method": "adm_online",
          "payment.payment_id": `adm_${transId}`,
          "payment.payment_status": "success",
        },
      }
    );
    if (booking) {
      res.json({ status: "success", result: booking });
    } else {
      res.json({ status: "error", result: "No Result" });
    }
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports.getCounts = async (req, res) => {
  try {
    const userCount = await usermodel.countDocuments();
    const expertCount = await expertmodel.countDocuments();
    const bookingCount = await bookingmodel.countDocuments();
    const cancelCount = await bookingmodel.countDocuments({
      status: "cancelled",
    });
    res
      .status(201)
      .json({
        status: "success",
        result: { userCount, expertCount, bookingCount, cancelCount },
      });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports.getChartData = async (req, res) => {
  try {
    const start = new Date();
    start.setDate(start.getDate() - 30);
    const end = new Date();
    const pieData = await expertmodel.aggregate([
      {
        $lookup: {
          from: "jobs",
          localField: "skills",
          foreignField: "_id",
          as: "job_skills",
        },
      },
      { $unwind: "$job_skills" },
      {
        $group: {
          _id: "$job_skills.job_role",
          expert_count: { $count: {} },
        },
      },
    ]);

    const bookings = await bookingmodel
      .find({
        "payment.payment_status": "success",
        jobEnd: { $gte: start, $lte: end },
      })
      .sort({ jobEnd: 1 });

    const result = Object.entries(
      bookings.reduce((acc, booking) => {
        const date = new Date(booking?.jobEnd);
        const dateString = date.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
        });
        acc[dateString] = (acc[dateString] || 0) + 1;
        return acc;
      }, {})
    ).map(([date, count]) => ({ date, count }));
    res.status(201).json({ status: "success", result: { pieData, result } });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports.getVouchers = async (req, res) => {
  try {
    const vouchers = await vouchermodel.find();
    res.status(201).json({ status: "success", result: vouchers });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports.addVoucher = async (req, res) => {
  try {
    const code = req.body.code?.toLowerCase();
    const voucher = await vouchermodel.findOne({ code: code });
    if (voucher) {
      res
        .status(400)
        .json({ status: "error", message: "Voucher Code already exists" });
    } else {
      const result = await cloudinary.uploader.upload(req.file.path, {
        format: "WebP",
        transformation: [{ width: 400, height: 200 }],
      });
      const newVoucher = await vouchermodel.create({
        code: req.body.code,
        vouchername: req.body.name,
        discount: req.body.discount,
        endDate: req.body.endDate,
        points: req.body.points,
        image: result.secure_url,
      });
      res.status(201).json({ status: "success", result: newVoucher });
      if (voucher) {
        fs.unlinkSync(req?.file?.path);
      }
    }
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

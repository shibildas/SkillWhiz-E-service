const bookingmodel = require("../Model/bookingSchema");
const vouchermodel = require("../Model/voucherSchema");
const usermodel = require("../Model/userSchema");
const cloudinary = require("../Controller/config/cloudinaryConfig");
const fs = require("fs");

module.exports.getVouchers = async (req, res) => {
  try {
    const userId = req.userId;
    const currentDate = new Date();
    const vouchers = await vouchermodel.find({
      users: { $not: { $in: [userId] } },
      listed: true,
      endDate: { $gte: currentDate },
    });
    res.status(201).json({ status: "success", result: vouchers });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports.applyVoucher = async (req, res) => {
  try {
    const userId = req.userId;
    const { id, bookId } = req.body;
    const currentDate = new Date();
    const voucher = await vouchermodel
      .findOne({
        _id: id,
        users: { $not: { $in: [userId] } },
        listed: true,
        endDate: { $gte: currentDate },
      })
      .select("-users");
    if (voucher) {
      const updatedvoucher = await vouchermodel.findOneAndUpdate(
        { _id: id, users: { $ne: userId } },
        { $addToSet: { users: userId } },
        { new: true }
      );
      const booking = await bookingmodel.findByIdAndUpdate(bookId, {
        voucherId: voucher._id,
        discount: voucher.discount,
      });
      const user = await usermodel
        .findByIdAndUpdate(
          userId,
          {
            $pull: { vouchers: id },
          },
          { new: true }
        )
        .populate({ path: "vouchers", select: "-users" })
        .select("-password");
      res.status(201).json({ status: "success", result: user });
    } else {
      res.json({ status: "error", message: user });
    }
  } catch (error) {}
};

module.exports.unapplyVoucher = async (req, res) => {
  try {
    const userId = req.userId;
    const { id, bookId } = req.body;
    const currentDate = new Date();
    const voucher = await vouchermodel
      .findOne({
        _id: id,
        users: { $in: [userId] },
        listed: true,
        endDate: { $gte: currentDate },
      })
      .select("-users");
    if (voucher) {
      const updatedvoucher = await vouchermodel.findOneAndUpdate(
        { _id: id, users: { $in: [userId] } },
        { $pull: { users: userId } },
        { new: true }
      );
      const booking = await bookingmodel.findByIdAndUpdate(bookId, {
        voucherId: null,
        discount: null,
      });
      const user = await usermodel
        .findByIdAndUpdate(
          userId,
          {
            $addToSet: { vouchers: id },
          },
          { new: true }
        )
        .populate({ path: "vouchers", select: "-users" })
        .select("-password");
      res.status(201).json({ status: "success", result: user });
    } else {
      res.status(301).json({ status: "error", message: "failed" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
module.exports.getThisVoucher = async (req, res) => {
  try {
    const id = req.params.id;
    const voucher = await vouchermodel.findOne({ _id: id });
    res.status(201).json({ status: "success", result: voucher });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
module.exports.unlistVoucher = async (req, res) => {
  try {
    const id = req.params.id;
    const voucher = await vouchermodel.findByIdAndUpdate(id, {
      $set: { listed: false },
    });
    res.status(201).json({ status: "success", result: voucher });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
module.exports.listVoucher = async (req, res) => {
  try {
    const id = req.params.id;
    const voucher = await vouchermodel.findByIdAndUpdate(id, {
      $set: { listed: true },
    });
    res.status(201).json({ status: "success", result: voucher });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
module.exports.editVoucher = async (req, res) => {
  try {
    const { id, name, discount, endDate, points } = req.body;
    const code = req.body.code?.toLowerCase();
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        format: "WebP",
        transformation: [{ width: 400, height: 200 }],
      });
      fs.unlinkSync(req.file.path);
      await vouchermodel.findByIdAndUpdate(id, {
        $set: {
          vouchername: name,
          discount,
          code,
          endDate,
          points,
          image: result.secure_url,
        },
      });
      res.status(201).json({ status: "success", message: "Edit Success" });
    } else {
      await vouchermodel.findByIdAndUpdate(id, {
        $set: {
          vouchername: name,
          discount,
          code,
          endDate,
          points,
        },
      });
      res.status(201).json({ status: "success", message: "Edit Success" });
    }
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

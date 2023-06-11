const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema(
  {
    vouchername: { type: String, required: true },
    code: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    discount: { type: Number, required: true },
    endDate: { type: Date, required: true },
    points: { type: Number, required: true },
    image: { type: String, required: true },
    users: [
      { type: mongoose.Schema.Types.ObjectId, ref: "user", unique: true },
    ],
    listed: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  }
);

const vouchermodel = mongoose.model("vouchers", voucherSchema);
module.exports = vouchermodel;

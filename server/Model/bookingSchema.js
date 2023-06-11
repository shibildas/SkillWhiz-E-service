const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    expertId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "expert",
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "jobs",
    },
    bill_amount: { type: Number },
    address: {
      name: { type: String },
      house: { type: String },
      street: { type: String },
      pincode: { type: Number },
    },
    slot: { type: String, required: true },
    estimate: {
      hours: { type: Number, default: 2 },
      parts: [{ pName: { type: String }, price: { type: Number } }],
      amount: { type: Number },
      reason: { type: String },
      status: { type: String, default: "pending" },
    },
    payment: {
      invoice: { type: String },
      payment_method: { type: String },
      payment_id: { type: String, unique: true, lowercase: true },
      payment_status: { type: String, default: "pending" },
    },
    status: { type: String, default: "pending" },
    booking_date: { type: Date, default: Date.now(), index: true },
    jobStart: { type: Date },
    jobEnd: { type: Date },
    reason: { type: String },
    voucherId: { type: mongoose.Schema.Types.ObjectId, ref: "vouchers" },
    discount: { type: Number },
  },
  {
    timestamps: true,
  }
);
const bookingmodel = mongoose.model("bookings", bookingSchema);
module.exports = bookingmodel;

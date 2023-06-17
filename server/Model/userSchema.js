const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true,minlength:[3]},
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: [6],
    },
    mobile: {
      type: String,
      unique: true,
      required: true,
    },
    image: {
      type: String,
    },
    address: [
      {
        name: { type: String },
        house: { type: String },
        street: { type: String },
        pincode: { type: Number },
      },
    ],
    isBanned: { type: Boolean, default: true },
    vouchers: [{ type: mongoose.Schema.Types.ObjectId, ref: "vouchers" }],
    loyality: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const usermodel = mongoose.model("user", userSchema);
module.exports = usermodel;

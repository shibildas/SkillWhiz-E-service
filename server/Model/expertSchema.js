const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true, minlength: [3] },

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
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "jobs" }],
    slots: { type: Array },
    bookedSlots: { type: Array },
    identity: {
      name: String,
      front: String,
      back: String,
      status: { type: String, default: "initial" },
      reason: String,
    },
    rating: { type: Array },
    isBanned: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const expertmodel = mongoose.model("expert", expertSchema);
module.exports = expertmodel;

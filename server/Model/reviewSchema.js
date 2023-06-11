const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    reviewBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "reviewModel",
    },
    myId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "myIdModel",
    },

    reviewModel: {
      type: String,
      required: true,
      enum: ["user", "expert"],
    },
    myIdModel: {
      type: String,
      required: true,
      enum: ["user", "expert"],
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "jobs",
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "bookings",
    },
    message: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const reviewmodel = mongoose.model("review", reviewSchema);
module.exports = reviewmodel;

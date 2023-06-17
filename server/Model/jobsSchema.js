const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    job_role: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minlength:[3],
      trim: true,
    },
    image: { type: String },
    base_rate: { type: Number, required: true },
    add_rate: { type: Number, required: true },
    listed: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
const jobsmodel = mongoose.model("jobs", jobSchema);
module.exports = jobsmodel;

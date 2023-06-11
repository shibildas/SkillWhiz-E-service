const mongoose = require("mongoose");

const msgSchema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    users: { type: Array },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "senderModel",
    },
    senderModel: {
      type: String,
      required: true,
      enum: ["user", "expert"],
    },
  },
  {
    timestamps: true,
  }
);
const msgmodel = mongoose.model("msg", msgSchema);
module.exports = msgmodel;

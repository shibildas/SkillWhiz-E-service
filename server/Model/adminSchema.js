const mongoose = require('mongoose');


const adminschema = new mongoose.Schema({
    email: {
    type: String,
     required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const adminmodel = mongoose.model("admin",adminschema )
module.exports = adminmodel
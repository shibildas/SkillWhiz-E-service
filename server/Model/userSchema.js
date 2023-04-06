const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username:{type: String, required: true, trim:true},
    
    email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim:true,
  },
 
  password: {
    type: String,
    trim:true,
    required: true,
    minlength: [6],
  },
  mobile:{
   type: String,
   unique: true,
   required:true,
  },
  image:{
    type: String,
  },
  isBanned:{type:Boolean, default:true},
  
 
},
{
  timestamps:true,
}
);


const usermodel = mongoose.model("user",userSchema )
module.exports = usermodel
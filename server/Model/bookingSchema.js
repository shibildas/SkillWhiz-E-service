const mongoose = require('mongoose');

const bookingSchema= new mongoose.Schema({
    userId:{ type:mongoose.Schema.Types.ObjectId, required:true, ref:'user'},
    expertId:{ type:mongoose.Schema.Types.ObjectId, required:true, ref:'expert'},
    jobId:{ type:mongoose.Schema.Types.ObjectId, required:true, ref:'jobs'},
    address:{
        name:{type:String},
        house:{type:String},
        street:{type:String},
        pincode:{type:Number},
      },
    slot:{type:String, required:true},
    estimate:{
        file:{type:String},
        amount:{type:Number}
    },
    payment:{
        payment_method:{type:String},
        payment_id:{type:String},
        payment_status:{type:String, default:'pending'},
    },
    status:{type:String, default:"pending"},
    booking_date: {type:Date, default: Date.now(), index:true}
})
const bookingmodel = mongoose.model("bookings",bookingSchema)
module.exports= bookingmodel
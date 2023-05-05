const mongoose= require('mongoose')

const voucherSchema= new mongoose.Schema({
    vouchername:{type:String, required:true},
    code:{type:String, required:true, lowercase,trim:true,unique:true},
    discount:{type:Number,required:true},
    endDate:{type:Date,required:true},
    image:{type:String,required:true},
    users:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}],
},{
    timestamps:true
})

const vouchermodel= mongoose.model('vouchers',voucherSchema)
module.exports = vouchermodel
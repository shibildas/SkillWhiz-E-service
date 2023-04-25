const mongoose =require("mongoose");

const messageSchema= mongoose.Schema(
    {
        conversationId:{
            type:mongoose.Schema.Types.ObjectId,ref:"bookings"
        },
        message:{
            type:String,
            required:true
        },
        sender:{
            type:String,
            required:true
        }

    },{
        timestamps:true
    }
)
const messageModel=mongoose.model("messages",messageSchema)
module.exports= messageModel
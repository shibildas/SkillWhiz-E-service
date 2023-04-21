const mongoose =require("mongoose");

const messageSchema= mongoose.Schema(
    {
        conversationId:{
            type:mongoose.Schema.Types.ObjectId,ref:"conversations"
        },
        message:{
            text:{type:String,required:true}
        },
        sender:{
            type:mongoose.Schema.Types.ObjectId, ref:"user"
        }

    },{
        timestamps:true
    }
)
const messageModel=mongoose.model("messages",messageSchema)
module.exports= messageModel
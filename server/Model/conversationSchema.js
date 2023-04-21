const mongoose = require('mongoose')

const conversationSchema= new mongoose.Schema({
    members:{type:Array}
},
{timestamps:true}
)
const conversationmodel= mongoose.model('conversations',conversationSchema)
module.exports=conversationmodel
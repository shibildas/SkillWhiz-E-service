const bookingmodel = require('../Model/bookingSchema')
const reviewmodel=require('../Model/reviewSchema')


module.exports.createReview= async (req,res)=>{
    try {
        const {reviewBy,myId,reviewModel,myIdModel,jobId,bookId,message,rating}=req.body
        const review=await reviewmodel.create({
            reviewBy,myId,reviewModel,myIdModel,jobId,bookId,message,rating
    })
    const booking =await bookingmodel.findByIdAndUpdate(bookId,
        {status:'closed'}
        )
        if(review & booking){
            res.json({'status':'success'})
        }else{
            res.json({'status':'error'})
        }
    } catch (error) {
        res.json({'status':'error',message:error.message})     
    }
}

module.exports.updateReview=async(req,res)=>{
try {
    const{id,message,rating}=req.body
    const review=await reviewmodel.findByIdAndUpdate(id,{
        message,rating
    })
    res.json({'status':"success"})
} catch (error) {
    res.json({'status':'error',message:error.message}) 
    
}
}
module.exports.sendEstimate = async (req, res) => {
    try {
      const { bookId, hours, parts, amount } = req.body;
      const booking = await bookingmodel.findOneAndUpdate(
        { _id: bookId },
        {
          $set: { estimate: { hours: hours, parts: [...parts], amount: amount} },
        }
      );
      if (booking) {
        res.json({ status: "success", result: booking });
      } else {
        res.json({ status: "error", message: "error.message" });
      }
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  };
  module.exports.approveEstimate=async(req,res)=>{
    try {
      const id=req.params.id
      const booking= await bookingmodel.findOneAndUpdate({_id:id},{$set:{'estimate.status':"approved"}})
      if(booking){
        res.json({"status":"success",result:booking})
      }else{
  
        res.json({ status: "error", message: "No Result" });
      }
    } catch (error) {
      
      res.json({ status: "error", message: error.message });
    }
  }
  module.exports.startJob = async (req, res) => {
    try {
      const id = req.params.id;
      const time = Date.now();
      const booking = await bookingmodel.findOneAndUpdate(
        { _id: id },
        { $set: { status: "started", jobStart: time } }
      );
      if (booking) {
        res.json({ status: "success" });
      } else {
        res.json({ status: "error" });
      }
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  };
  module.exports.endJob = async (req, res) => {
    try {
      const { parts, hours, total, id } = req.body;
      const time = Date.now();
      const booking = await bookingmodel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            "estimate.parts": [...parts],
            "estimate.hours": hours,
            bill_amount: total,
            "payment.invoice": `INV_${id}`,
            status:"completed",
            jobEnd:time
          },
        }
      );
      if(booking){
  
        res.json({ status: "success" });
      }else{
        res.json({ status: "error" });
        
      }
    } catch (error) {
      res.json({ status: "error",message:error.message });
      
    }
  }
  module.exports.declineEstimate=async(req,res)=>{
    try {
      const {id,text}=req.body
      const booking= await bookingmodel.findByIdAndUpdate(id,{$set:{estimate:{reason:text,hours:2,status:'pending'}}})
      if(booking){
        res.json({'status':'success'})
      }else{
        res.json({'status':'error',message:'no Data'})
      }      
    } catch (error) {
      
      res.json({ status: "error",message:error.message });
    }
  }

  module.exports.cancelBooking=async(req,res)=>{
    try {
      const {id,reason}=req.body
      const booking= await bookingmodel.findByIdAndUpdate(id,{$set:{reason:reason,status:'cancelled'}})
      if(booking){
        res.json({'status':'success'})
      }else{
        res.json({'status':'error',message:'no Data'})
      } 
    } catch (error) {
      res.json({ status: "error",message:error.message });
      
    }
  }
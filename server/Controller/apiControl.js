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
          $set: { estimate: { hours: hours, parts: [...parts], amount: amount } },
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
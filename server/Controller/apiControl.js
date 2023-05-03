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
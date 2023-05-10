const vouchermodel = require("../Model/voucherSchema");


module.exports.getVouchers=async(req,res)=>{
    try {
        const userId=req.userId
        const currentDate = new Date();
        const vouchers = await vouchermodel.find({
            users: { $not: { $in: [userId] } },
            listed: true,
            endDate: { $gte: currentDate }
          });
        res.status(201).json({"status":"success",result:vouchers})
        
    } catch (error) {
        res.status(400).json({"status":"error",message:error.message})
        
    }
}
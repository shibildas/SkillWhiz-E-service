const jwt = require("jsonwebtoken")

module.exports.verifyJWT = async(req,res,next)=>{
    
    const token = req.headers["x-access-token"]
    if(!token){
        res.send({ "status": "failed", "message": "You need token" })

    } else{
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
            if(err){
                console.log(err)
                res.json({auth:false,status:"failed",message:"failed to authenticate"})
            }else{
            console.log(decoded.userId)
            req.userId =decoded.userId
                next();
            }
        })
    }
}

module.exports.adminJwt = async(req,res,next)=>{
    const token = req.headers["x-access-admintoken"]
   
    if(!token){
        res.send({ "status": "failed", "message": "You need token" })

    } else{
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
          
            if(err){
                console.log(err)
                res.json({auth:false,status:"failed",message:"failed to authenticate"})
            }else{
            
            req.adminId =decoded.adminID
                next();
            }
        })
    }
}
module.exports.expertJwt = async(req,res,next)=>{
    const token = req.headers["x-access-experttoken"]
   
    if(!token){
        res.send({ "status": "failed", "message": "You need token" })

    } else{
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
          
            if(err){
                console.log(err)
                res.json({auth:false,status:"failed",message:"failed to authenticate"})
            }else{
            
            req.expertId =decoded.expertId
                next();
            }
        })
    }
}
const express = require('express')
const router = express.Router()
const expertControl = require("../Controller/expertControl")
const Auth = require('../Middlewares/Auth')
const upload = require('../Middlewares/multer')

router.post("/signup",expertControl.postregister)
router.post("/verify-otp",expertControl.verify)
router.post('/signin',expertControl.signin)
router.get('/isExpertAuth',Auth.expertJwt,expertControl.isExpertAuth)
router.post("/initialVerify",Auth.expertJwt,upload.fields([{name:'front',maxCount:1},
{name:'back',maxCount:1}]),expertControl.applyVerify)
router.get('/getAllJobs',Auth.expertJwt,expertControl.getAllJobs)
router.post('/addSkill',Auth.expertJwt,expertControl.addSkill)
router.get('/getMyJobs',Auth.expertJwt,expertControl.getMyJobs)
router.get("/removeSkill/:id",Auth.expertJwt,expertControl.removeSkill)

router.post('/updatePassword',Auth.expertJwt,expertControl.changePassword)
router.post('/re-Verify',Auth.expertJwt,expertControl.reVerify)
router.post('/reVerify-otp',Auth.expertJwt,expertControl.reVerify_OTP)
router.post('/editProfile',Auth.expertJwt,upload.single('image'),expertControl.editProfile)

module.exports = router
const express = require('express')
const router = express.Router()
const userControl = require("../Controller/userControl")
const auth = require("../Middlewares/Auth")
const upload= require("../Middlewares/multer")

router.post('/signup',userControl.postSignUp)
router.post('/verify-otp',userControl.verifyOTP)
router.post('/signin',userControl.signin)
router.get('/isUserAuth',auth.verifyJWT,userControl.isUserAuth)
router.get('/get7Jobs',userControl.get7Jobs)
router.post('/updatePassword',auth.verifyJWT,userControl.changePassword)
router.post('/re-Verify',auth.verifyJWT,userControl.reVerify)
router.post('/reVerify-otp',auth.verifyJWT,userControl.reVerify_OTP)
router.post('/editProfile',auth.verifyJWT,upload.single('image'),userControl.editProfile)

module.exports = router
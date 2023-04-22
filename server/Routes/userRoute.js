const express = require('express')
const router = express.Router()
const userControl = require("../Controller/userControl")
const auth = require("../Middlewares/Auth")
const upload= require("../Middlewares/multer")

router.post('/signup',userControl.postSignUp)
router.post('/verify-otp',userControl.verifyOTP)
router.post('/signin',userControl.signin)
router.get('/isUserAuth',auth.userProtect,userControl.isUserAuth)
router.get('/get7Jobs',userControl.get7Jobs)
router.get('/jobDetail/:id',auth.userProtect,userControl.getJob)
router.post('/updatePassword',auth.userProtect,userControl.changePassword)
router.post('/re-Verify',auth.userProtect,userControl.reVerify)
router.post('/reVerify-otp',auth.userProtect,userControl.reVerify_OTP)
router.post('/editProfile',auth.userProtect,upload.single('image'),userControl.editProfile)
router.get('/getSlots/:id',auth.userProtect,userControl.getSlotsofJob)
router.post('/addAddress',auth.userProtect,userControl.addAddress)
router.get('/address',auth.userProtect,userControl.getAddress)
router.post('/bookJob',auth.userProtect,userControl.bookJob)
router.get(`/booking/:id`, auth.userProtect,userControl.bookings)
router.get("/myBookings",auth.userProtect,userControl.myBookings)


module.exports = router
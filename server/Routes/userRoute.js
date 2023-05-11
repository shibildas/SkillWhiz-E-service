 /**
 * @swagger
 * /signup:
 *  post:
 *    description: Use to signup a User with legit indian mobile number
 *    responses:
 *      '201':
 *        description:"user added success response"
 * 
 */

 /**
 * @swagger
 * /get7Jobs:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */

const express = require('express')
const router = express.Router()
const userControl = require("../Controller/userControl")
const {userProtect} = require("../Middlewares/Auth")
const upload= require("../Middlewares/multer")
const {getMessages,addMessage}=require('../Controller/messageControl')
const {createuserReview,updateReview,approveEstimate,declineEstimate,cancelBooking, allJobs}= require('../Controller/apiControl')
const {getVouchers, applyVoucher, unapplyVoucher}= require('../Controller/voucherControl')

router.post('/signup',userControl.postSignUp)
router.post('/verify-otp',userControl.verifyOTP)
router.post('/signin',userControl.signin)
router.get('/isUserAuth',userProtect,userControl.isUserAuth)
router.get('/get7Jobs',userControl.get7Jobs)
router.get('/jobDetail/:id',userProtect,userControl.getJob)
router.post('/updatePassword',userProtect,userControl.changePassword)
router.post('/re-Verify',userProtect,userControl.reVerify)
router.post('/reVerify-otp',userProtect,userControl.reVerify_OTP)
router.post('/editProfile',userProtect,upload.single('image'),userControl.editProfile)
router.get('/getSlots/:id',userProtect,userControl.getSlotsofJob)
router.post('/addAddress',userProtect,userControl.addAddress)
router.get('/address',userProtect,userControl.getAddress)
router.post('/bookJob',userProtect,userControl.bookJob)
router.get(`/booking/:id`, userProtect,userControl.bookings)
router.get("/myBookings",userProtect,userControl.myBookings)
router.get('/approveEstimate/:id',userProtect,approveEstimate)
router.post('/payment',userProtect,userControl.onlinePayment)
router.post('/paymentVerify',userProtect,userControl.verifyPayment)
router.get('/getContacts',userProtect,userControl.getContacts)
router.post('/getMessage',userProtect,getMessages)
router.post('/addMessage',userProtect,addMessage)
router.post('/addReview',userProtect,createuserReview)
router.post('/updateReview',userProtect,updateReview)
router.post('/decline',userProtect,declineEstimate)
router.post('/cancelBooking',userProtect,cancelBooking)
router.get('/getAllJobs',userProtect,allJobs)
router.get('/getvouchers',userProtect,getVouchers)
router.post('/redeemVoucher',userProtect,userControl.redeemVoucher)
router.post('/applyVoucher',userProtect,applyVoucher)
router.post('/removeVoucher',userProtect,unapplyVoucher)


module.exports = router
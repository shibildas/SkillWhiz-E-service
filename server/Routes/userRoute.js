const express = require('express')
const router = express.Router()
const userControl = require("../Controller/userControl")
const auth = require("../Middlewares/Auth")

router.post('/signup',userControl.postSignUp)
router.post('/verify-otp',userControl.verifyOTP)
router.post('/signin',userControl.signin)
router.get('/isUserAuth',auth.verifyJWT,userControl.isUserAuth)
router.get('/get7Jobs',userControl.get7Jobs)
router.post('/updatePassword',auth.verifyJWT,userControl.changePassword)

module.exports = router
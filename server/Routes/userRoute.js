const express = require('express')
const router = express.Router()
const userControl = require("../Controller/userControl")

router.post('/signup',userControl.postSignUp)
router.post('/verify-otp',userControl.verifyOTP)

module.exports = router
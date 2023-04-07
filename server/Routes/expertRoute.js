const express = require('express')
const router = express.Router()
const expertControl = require("../Controller/expertControl")
const Auth = require('../Middlewares/Auth')

router.post("/signup",expertControl.postregister)
router.post("/verify-otp",expertControl.verify)
router.post('/signin',expertControl.signin)
router.get('/isExpertAuth',Auth.expertJwt,expertControl.isExpertAuth)

module.exports = router
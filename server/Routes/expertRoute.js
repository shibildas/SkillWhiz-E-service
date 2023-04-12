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

module.exports = router
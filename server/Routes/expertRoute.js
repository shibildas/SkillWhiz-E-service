const express = require('express')
const router = express.Router()
const expertControl = require("../Controller/expertControl")

router.post("/signup",expertControl.postregister)
router.post("/verify-otp",expertControl.verify)

module.exports = router
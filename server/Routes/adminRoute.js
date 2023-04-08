const express = require('express')
const router = express.Router()
const adminControl = require('../Controller/adminControl')
const Auth= require('../Middlewares/Auth')

router.post('/',adminControl.adminLogin)
router.get('/isAdminAuth',Auth.adminJwt,adminControl.isAdminAuth)
router.get('/getExperts',Auth.adminJwt,adminControl.getExperts)
router.get('/getUsers',Auth.adminJwt,adminControl.getUsers)

module.exports = router
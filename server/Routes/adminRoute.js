const express = require('express')
const router = express.Router()
const adminControl = require('../Controller/adminControl')
const Auth= require('../Middlewares/Auth')
const handleFileUpload = require("../Middlewares/uploadfile")
const multer= require("multer")
const upload = multer({ dest: 'uploads/' })

router.post('/',adminControl.adminLogin)
router.get('/isAdminAuth',Auth.adminJwt,adminControl.isAdminAuth)
router.get('/getExperts',Auth.adminJwt,adminControl.getExperts)
router.get('/getUsers',Auth.adminJwt,adminControl.getUsers)
router.get('/getJobs',Auth.adminJwt,adminControl.getJobs)
router.post('/addjobs',Auth.adminJwt,upload.single("image"),adminControl.addJobs)
router.post('/blockUser',Auth.adminJwt,adminControl.blockUser)
router.post('/unBlockUser',Auth.adminJwt,adminControl.unBlockUser)

module.exports = router
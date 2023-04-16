const express = require('express')
const router = express.Router()
const adminControl = require('../Controller/adminControl')
const Auth= require('../Middlewares/Auth')
const mult= require("../Middlewares/multer")

router.post('/',adminControl.adminLogin)
router.get('/isAdminAuth',Auth.adminJwt,adminControl.isAdminAuth)
router.get('/getExperts',Auth.adminJwt,adminControl.getExperts)
router.get('/getUsers',Auth.adminJwt,adminControl.getUsers)
router.get('/getJobs',Auth.adminJwt,adminControl.getJobs)
router.post('/addjobs',Auth.adminJwt,mult.single("image"),adminControl.addJobs)
router.get('/blockUser/:id',Auth.adminJwt,adminControl.blockUser)
router.get('/unBlockUser/:id',Auth.adminJwt,adminControl.unBlockUser)
router.post('/editUser',Auth.adminJwt,mult.single('image'),adminControl.editUser)
router.get('/unListJob/:id',Auth.adminJwt,adminControl.unListJob)
router.get('/listJob/:id',Auth.adminJwt,adminControl.listJob)
router.post('/editJob',Auth.adminJwt,mult.single("image"),adminControl.editJob)
router.get('/verifyExpert/:id',Auth.adminJwt,adminControl.verifyExpert)
router.get('/rejectExpert/:id',Auth.adminJwt,adminControl.rejectExpert)

router.post('/editExpert',Auth.adminJwt,mult.single('image'),adminControl.editExpert)
router.get('/blockExpert/:id',Auth.adminJwt,adminControl.blockExpert)
router.get('/unBlockExpert/:id',Auth.adminJwt,adminControl.unBlockExpert)


module.exports = router
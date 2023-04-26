const express = require('express')
const router = express.Router()
const adminControl = require('../Controller/adminControl')
const Auth= require('../Middlewares/Auth')
const mult= require("../Middlewares/multer")

router.post('/',adminControl.adminLogin)
router.get('/isAdminAuth',Auth.adminProtect,adminControl.isAdminAuth)
router.get('/getExperts',Auth.adminProtect,adminControl.getExperts)
router.get('/getUsers',Auth.adminProtect,adminControl.getUsers)
router.get('/getJobs',Auth.adminProtect,adminControl.getJobs)
router.post('/addjobs',Auth.adminProtect,mult.single("image"),adminControl.addJobs)
router.get('/blockUser/:id',Auth.adminProtect,adminControl.blockUser)
router.get('/unBlockUser/:id',Auth.adminProtect,adminControl.unBlockUser)
router.post('/editUser',Auth.adminProtect,mult.single('image'),adminControl.editUser)
router.get('/unListJob/:id',Auth.adminProtect,adminControl.unListJob)
router.get('/listJob/:id',Auth.adminProtect,adminControl.listJob)
router.post('/editJob',Auth.adminProtect,mult.single("image"),adminControl.editJob)
router.get('/verifyExpert/:id',Auth.adminProtect,adminControl.verifyExpert)
router.post('/rejectExpert/:id',Auth.adminProtect,adminControl.rejectExpert)

router.post('/editExpert',Auth.adminProtect,mult.single('image'),adminControl.editExpert)
router.get('/blockExpert/:id',Auth.adminProtect,adminControl.blockExpert)
router.get('/unBlockExpert/:id',Auth.adminProtect,adminControl.unBlockExpert)
router.get('/getSchedule/:id',Auth.adminJwt,adminControl.getSchedule)
router.post('/addSchedule',Auth.adminProtect,adminControl.addSchedule)


module.exports = router
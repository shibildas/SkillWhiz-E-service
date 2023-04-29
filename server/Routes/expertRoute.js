const express = require('express')
const router = express.Router()
const expertControl = require("../Controller/expertControl")
const Auth = require('../Middlewares/Auth')
const upload = require('../Middlewares/multer')

router.post("/signup",expertControl.postregister)
router.post("/verify-otp",expertControl.verify)
router.post('/signin',expertControl.signin)
router.get('/isExpertAuth',Auth.expertProtect,expertControl.isExpertAuth)
router.post("/initialVerify",Auth.expertProtect,upload.fields([{name:'front',maxCount:1},
{name:'back',maxCount:1}]),expertControl.applyVerify)
router.get('/getAllJobs',Auth.expertProtect,expertControl.getAllJobs)
router.post('/addSkill',Auth.expertProtect,expertControl.addSkill)
router.get('/getMyJobs',Auth.expertProtect,expertControl.getMyJobs)
router.get("/removeSkill/:id",Auth.expertProtect,expertControl.removeSkill)

router.post('/updatePassword',Auth.expertProtect,expertControl.changePassword)
router.post('/re-Verify',Auth.expertProtect,expertControl.reVerify)
router.post('/reVerify-otp',Auth.expertProtect,expertControl.reVerify_OTP)
router.post('/editProfile',Auth.expertProtect,upload.single('image'),expertControl.editProfile)
router.post("/addSchedule",Auth.expertProtect,expertControl.addSchedule)
router.get('/getSchedule',Auth.expertProtect,expertControl.getSchedule)
router.get('/myBookings',Auth.expertProtect,expertControl.getAppointments)
router.get('/booking/:id',Auth.expertProtect,expertControl.getBookings)
router.post('/sendEstimate',Auth.expertProtect,expertControl.sendEstimate)
router.get('/startJob/:id',Auth.expertProtect,expertControl.startJob)
router.post('/endJob',Auth.expertProtect,expertControl.endJob)


module.exports = router
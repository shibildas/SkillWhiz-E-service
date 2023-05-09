/**
 * @swagger
 * /expert/signup:
 *  post:
 *    description: Use to register a new expert
 *    parameters:
 *      - name: username
 *        description: The name of the expert
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *      - name: email
 *        description: The email of the expert
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *          format: email
 *      - name: password
 *        description: The password of the expert
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *          format: password
 *      - name: mobile
 *        description: The mobile number of the expert
 *        in: body
 *        required: true
 *        schema:
 *          type: integer
 *          format: number
 *    responses:
 *      '201':
 *        description: The expert has been registered successfully
 *      '401':
 *        description: The expert registration was unsuccessful
 */


const express = require('express')
const router = express.Router()
const expertControl = require("../Controller/expertControl")
const {expertProtect} = require('../Middlewares/Auth')
const upload = require('../Middlewares/multer')
const {getMessages,addMessage}=require('../Controller/messageControl')
const {createReview,updateReview,sendEstimate,startJob,endJob}=require('../Controller/apiControl')


router.post("/signup",expertControl.postregister)
router.post("/verify-otp",expertControl.verify)
router.post('/signin',expertControl.signin)
router.get('/isExpertAuth',expertProtect,expertControl.isExpertAuth)
router.post("/initialVerify",expertProtect,upload.fields([{name:'front',maxCount:1},
{name:'back',maxCount:1}]),expertControl.applyVerify)
router.get('/getAllJobs',expertProtect,expertControl.getAllJobs)
router.post('/addSkill',expertProtect,expertControl.addSkill)
router.get('/getMyJobs',expertProtect,expertControl.getMyJobs)
router.get("/removeSkill/:id",expertProtect,expertControl.removeSkill)
router.post('/updatePassword',expertProtect,expertControl.changePassword)
router.post('/re-Verify',expertProtect,expertControl.reVerify)
router.post('/reVerify-otp',expertProtect,expertControl.reVerify_OTP)
router.post('/editProfile',expertProtect,upload.single('image'),expertControl.editProfile)
router.post("/addSchedule",expertProtect,expertControl.addSchedule)
router.get('/getSchedule',expertProtect,expertControl.getSchedule)
router.get('/myBookings',expertProtect,expertControl.getAppointments)
router.get('/booking/:id',expertProtect,expertControl.getBookings)
router.post('/sendEstimate',expertProtect,sendEstimate)
router.get('/startJob/:id',expertProtect,startJob)
router.post('/endJob',expertProtect,endJob)
router.get('/getContacts',expertProtect,expertControl.getContacts)
router.post('/getMessage',expertProtect,getMessages)
router.post('/addMessage',expertProtect,addMessage)
router.post('/addReview',expertProtect,createReview)
router.post('/updateReview',expertProtect,updateReview)

module.exports = router
import { expertAxiosInstance } from "../axios/instance"

const authExpert=()=>{
   return expertAxiosInstance.get('/isExpertAuth')
}
const startJob=(id)=>{
   return expertAxiosInstance.get(`/startJob/${id}`)
}

const endJob=(parts,hours,total,id)=>{
   return expertAxiosInstance.post('/endJob',{parts,hours,total,id})
}
const getUserContacts=()=>{
   return expertAxiosInstance.get('/getContacts')
}
const getExpertMessage=(data)=>{
   return expertAxiosInstance.post('/getMessage', data)
}
const addExpertMessage=(data)=>{
   return expertAxiosInstance.post('/addMessage',data)
}
const expertReview=(data)=>{
   return expertAxiosInstance.post('/addReview',data)
}
const expertUpdateReview=(data)=>{
   return expertAxiosInstance.post('/updateReview',data)
}
const sendExpertEstimate=(data)=>{
   return expertAxiosInstance.post('/sendEstimate',data)
}
const getmyJobs=()=>{
   return expertAxiosInstance.get("/getMyJobs")
}
const removeSkill=(arg)=>{
   return expertAxiosInstance.get(`/removeSkill/${arg}`)
}
const getJobList=()=>{
   return expertAxiosInstance.get("/getAllJobs")
}
const addSkill=(data)=>{
   return expertAxiosInstance.post("/addSkill",data)
}
const getExpertBooking=(id)=>{
   return  expertAxiosInstance.get(`/booking/${id}`)
}
const expertReVerify=(mobile)=>{
   return expertAxiosInstance.post("/re-Verify", { mobile: mobile })
}
const updateExpertPassword=(data)=>{
   return expertAxiosInstance.post('/updatePassword',data)
}
const editExpertProfile=(formData)=>{
   return expertAxiosInstance.post("/editProfile",formData,{headers:{
      "Content-Type": "multipart/form-data",
}})
}
const expertReverifyOTP=(data)=>{
   return expertAxiosInstance.post("/reVerify-otp",data)
}
const expertSignup=(data)=>{
   return expertAxiosInstance.post('/signup',data)
}
const expertSignIn=(data)=>{
   return expertAxiosInstance.post('/signin',data)
}
const expertVerifyOTP=(data)=>{
   return expertAxiosInstance
   .post("/verify-otp",data)
}
const expertbookings=()=>{
   return expertAxiosInstance.get('/myBookings')
}
const expertAddSchedule=(data)=>{
   return expertAxiosInstance
   .post(
     "/addSchedule",data)
}
const getexpertSchedule=()=>{
   return expertAxiosInstance
   .get("/getSchedule")
}

export {getexpertSchedule,expertAddSchedule,expertbookings,expertVerifyOTP,expertSignIn,expertSignup,expertReverifyOTP,editExpertProfile,updateExpertPassword,expertReVerify,getExpertBooking,addSkill,getJobList,removeSkill,getmyJobs,sendExpertEstimate,expertUpdateReview,addExpertMessage,expertReview,getExpertMessage,authExpert,startJob,endJob,getUserContacts}
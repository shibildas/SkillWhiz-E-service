import { expertAxiosInstance } from "../axios/instance"

const authExpert=()=>{
   return expertAxiosInstance.get('/isExpertAuth')
}
const startJob=(id)=>{
   return expertAxiosInstance.get(`/startJob/${id}`)
}
export {authExpert,startJob}
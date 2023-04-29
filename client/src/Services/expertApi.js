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
export {authExpert,startJob,endJob}
import { userAxiosInstance }  from "../axios/instance"


const authUser=()=>{
    return userAxiosInstance.get('/isUserAuth')
}
const payOnline=(amount)=>{
    return userAxiosInstance.post('/payment',{amount})
}
const verifyPayment=(response,bookId)=>{
    return userAxiosInstance.post('/paymentVerify',{...response,bookId})
}
const getExpertContacts=()=>{
    return userAxiosInstance.get('/getContacts')
}


export {authUser,payOnline,verifyPayment,getExpertContacts}
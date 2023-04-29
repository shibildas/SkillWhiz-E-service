import { userAxiosInstance }  from "../axios/instance"


const authUser=()=>{
    return userAxiosInstance.get('/isUserAuth')
}
const payOnline=(amount)=>{
    return userAxiosInstance.post('/payment',{amount})
}
const verifyPayment=(response)=>{
    return userAxiosInstance.post('/paymentVerify',response)
}


export {authUser,payOnline,verifyPayment}
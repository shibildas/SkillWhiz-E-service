import { adminAxiosInstance }  from "../axios/instance"


const authAdmin=()=>{
    return adminAxiosInstance.get('/isAdminAuth')
}
const bookingList=()=>{
    return adminAxiosInstance.get('/bookingList')
}
const getBookingBy=(id)=>{
    return adminAxiosInstance.get(`/getBooking/${id}`)
}

export {authAdmin,bookingList,getBookingBy}
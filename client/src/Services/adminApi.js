import { adminAxiosInstance }  from "../axios/instance"


const authAdmin=()=>{
    return adminAxiosInstance.get('/isAdminAuth')
}

export {authAdmin}
import { userAxiosInstance }  from "../axios/instance"


const authUser=()=>{
    return userAxiosInstance.get('/isUserAuth')
}


export {authUser}
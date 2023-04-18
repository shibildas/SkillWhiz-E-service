import axios from 'axios';
import {baseUrl,expertBaseUrl} from "../constants/constants"


const createAxiosClient=(isExpert)=>{
    const client= axios.create({

        baseUrl:(isExpert? expertBaseUrl:baseUrl),
        timeout:3000,
        timeoutErrorMessage:"Request timeout... Please Try Again!!!"
    })
    return client

}

const attachToken=(req,isExpert)=>{
    let authToken= isExpert ? localStorage.getItem("experttoken"): localStorage.getItem("token")
    if (authToken){
        req.headers.Authorization = `Bearer ${authToken}`
    }
    return req
}

const expertAxiosInstance= createAxiosClient(true)
expertAxiosInstance.interceptors.request.use(async(req)=>{
    const modifiedReq=attachToken(req,true)
    return modifiedReq
})

const userAxiosInstance = createAxiosClient()
userAxiosInstance.interceptors.request.use(async (req)=>{
    const modifiedReq= attachToken(req)
return modifiedReq
})

export {expertAxiosInstance,userAxiosInstance}

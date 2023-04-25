import axios from 'axios';
import { baseUrl, expertBaseUrl, AdminBaseUrl } from "../constants/constants"

const createAxiosClient = (baseURL) => {
  const client = axios.create({
    baseURL,
    timeout: 3000,
    timeoutErrorMessage: "Request timeout... Please Try Again!!!"
  })
  return client
}

const attachToken = (req, tokenName = "token") => {
  let authToken = localStorage.getItem(tokenName)
  if (authToken) {
    req.headers.Authorization = `Bearer ${authToken}`
  }
  return req
}

const expertAxiosInstance = createAxiosClient(expertBaseUrl)
expertAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "experttoken")
  return modifiedReq
})

const userAxiosInstance = createAxiosClient(baseUrl)
userAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req)
  return modifiedReq
})

const adminAxiosInstance = createAxiosClient(AdminBaseUrl)
adminAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "admintoken")
  return modifiedReq
})

export { expertAxiosInstance, userAxiosInstance, adminAxiosInstance }

import { userAxiosInstance } from "../axios/instance";

const authUser = () => {
  return userAxiosInstance.get("/isUserAuth");
};
const resetPassword=(data)=>{
  return userAxiosInstance.post('/reset',data)
}
const updateNewPassword=(data)=>{
  return userAxiosInstance.post('/update',data)
}
const payOnline = (amount) => {
  return userAxiosInstance.post("/payment", { amount });
};
const verifyPayment = (response, bookId) => {
  return userAxiosInstance.post("/paymentVerify", { ...response, bookId });
};
const getExpertContacts = () => {
  return userAxiosInstance.get("/getContacts");
};
const getUserMessage = (data) => {
  return userAxiosInstance.post("/getMessage", data);
};
const addUserMessage = (data) => {
  return userAxiosInstance.post("/addMessage", data);
};
const userReview = (data) => {
  return userAxiosInstance.post("/addReview", data);
};
const userUpdateReview = (data) => {
  return userAxiosInstance.post("/updateReview", data);
};
const userApproveEstimate = (id) => {
  return userAxiosInstance.get(`/approveEstimate/${id}`);
};
const userDecline = (data) => {
  return userAxiosInstance.post("/decline", data);
};
const userCancelBook = (data) => {
  return userAxiosInstance.post("/cancelBooking", data);
};
const getAllJobs = () => {
  return userAxiosInstance.get("/getAllJobs");
};
const bookJobs = (data) => {
  return userAxiosInstance.post("/bookJob", data);
};
const getAddress = () => {
  return userAxiosInstance.get("/address");
};
const addAddress = (data) => {
  return userAxiosInstance.post("/addAddress", data);
};
const getAllVouchers = () => {
  return userAxiosInstance.get("/getvouchers");
};
const redeemVoucher = (data) => {
  return userAxiosInstance.post("/redeemVoucher", data);
};
const applyVoucher = (data) => {
  return userAxiosInstance.post("/applyVoucher", data);
};
const removeVoucher = (data) => {
  return userAxiosInstance.post("/removeVoucher", data);
};
const verifyCancel = (response, bookId) => {
  return userAxiosInstance.post("/verifyCancel", { ...response, bookId });
};
const editProfileApi = (formData) => {
  return userAxiosInstance.post("/editProfile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const updatePassword = (data) => {
  return userAxiosInstance.post("/updatePassword", data);
};
const userReverify = (data) => {
  return userAxiosInstance.post("/reVerify-otp", data);
};

export {
  updateNewPassword,
  resetPassword,
  userReverify,
  updatePassword,
  editProfileApi,
  verifyCancel,
  removeVoucher,
  applyVoucher,
  redeemVoucher,
  getAllVouchers,
  addAddress,
  getAddress,
  bookJobs,
  getAllJobs,
  userCancelBook,
  userDecline,
  userApproveEstimate,
  userUpdateReview,
  addUserMessage,
  getUserMessage,
  authUser,
  payOnline,
  verifyPayment,
  getExpertContacts,
  userReview,
};

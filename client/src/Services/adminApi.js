import { adminAxiosInstance } from "../axios/instance";

const authAdmin = () => {
  return adminAxiosInstance.get("/isAdminAuth");
};
const bookingList = () => {
  return adminAxiosInstance.get("/bookingList");
};
const getBookingBy = (id) => {
  return adminAxiosInstance.get(`/getBooking/${id}`);
};
const login = (email, password) => {
  return adminAxiosInstance.post("/", { email, password });
};
const blockExpert = (id) => {
  return adminAxiosInstance.get(`/blockExpert/${id}`);
};
const unBlockExpert = (id) => {
  return adminAxiosInstance.get(`/unBlockExpert/${id}`);
};
const getExperts = () => {
  return adminAxiosInstance.get("/getExperts");
};
const addSchedule = (selectTime, id) => {
  return adminAxiosInstance.post("/addSchedule", {
    dates: selectTime,
    _id: id,
  });
};
const editExpert = (formData) => {
  return adminAxiosInstance.post("/editExpert", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const verifyExpert = (id) => {
  return adminAxiosInstance.get(`/verifyExpert/${id}`);
};
const rejectExpert = (id, reason) => {
  return adminAxiosInstance.post(`/rejectExpert/${id}`, { reason: reason });
};
const getJobs = () => {
  return adminAxiosInstance.get("/getJobs");
};
const unListJob = (id) => {
  return adminAxiosInstance.get(`/unListJob/${id}`);
};
const listJob = (id) => {
  return adminAxiosInstance.get(`/listJob/${id}`);
};
const editJob = (formData) => {
  return adminAxiosInstance.post("/editJob", formData);
};
const addJob = (formData) => {
  return adminAxiosInstance.post("/addjobs", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const getUsers = () => {
  return adminAxiosInstance.get("/getUsers");
};
const blockUser = (id) => {
  return adminAxiosInstance.get(`/blockUser/${id}`);
};
const unBlockUser = (id) => {
  return adminAxiosInstance.get(`/unBlockUser/${id}`);
};
const editUser = (formData) => {
  return adminAxiosInstance.post("/editUser", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const sendAdminEstimate = (data) => {
  return adminAxiosInstance.post("/addEstimate", data);
};
const adminApproveEstimate = (id) => {
  return adminAxiosInstance.get(`/approveEstimate/${id}`);
};
const adminStartJob = (id) => {
  return adminAxiosInstance.get(`/startJob/${id}`);
};
const adminEndJob = (parts, hours, total, id) => {
  return adminAxiosInstance.post("/endJob", { parts, hours, total, id });
};
const adminPay = (data) => {
  return adminAxiosInstance.post("/adminPay", data);
};
const adminDecline = (data) => {
  return adminAxiosInstance.post("/decline", data);
};
const adminCancelBook = (data) => {
  return adminAxiosInstance.post("/cancelBooking", data);
};
const getCounts = () => {
  return adminAxiosInstance.get("/getCardCounts");
};
const getChartData = () => {
  return adminAxiosInstance.get("/getChartData");
};
const getVouchers = () => {
  return adminAxiosInstance.get("/getVouchers");
};
const addVoucher = (data) => {
  return adminAxiosInstance.post("/addVoucher", data);
};
const getThisVoucher = (id) => {
  return adminAxiosInstance.get(`/getVoucher/${id}`);
};
const unListVoucher = (id) => {
  return adminAxiosInstance.get(`/unlistVoucher/${id}`);
};
const listVoucher = (id) => {
  return adminAxiosInstance.get(`/listVoucher/${id}`);
};
const editVoucher = (data) => {
  return adminAxiosInstance.post("/editVoucher", data);
};

export {
  editVoucher,
  listVoucher,
  unListVoucher,
  getThisVoucher,
  addVoucher,
  getVouchers,
  getChartData,
  getCounts,
  adminCancelBook,
  adminDecline,
  adminPay,
  adminEndJob,
  adminStartJob,
  adminApproveEstimate,
  sendAdminEstimate,
  editUser,
  unBlockUser,
  blockUser,
  getUsers,
  addJob,
  editJob,
  listJob,
  unListJob,
  getJobs,
  editExpert,
  rejectExpert,
  verifyExpert,
  authAdmin,
  bookingList,
  getBookingBy,
  login,
  blockExpert,
  unBlockExpert,
  getExperts,
  addSchedule,
};

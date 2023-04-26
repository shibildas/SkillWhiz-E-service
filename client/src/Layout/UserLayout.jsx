import useAuthUser from "../hooks/useAuthUser";
import React from "react"
import {Route, Routes} from "react-router-dom"
import Footer from "../Components/Footer/Footer"
import MainPage from "../Pages/User/MainPage"
import  Navbar  from "../Components/Navbar/Navbar"
import ErrorPage from "../Pages/Error/Error"
import Profile from "../Pages/User/Profile";
import Private from "../ProtectedRoutes/Private";
import Detail from "../Pages/User/Detail";
import ScheduleJob from "../Pages/User/ScheduleJob";
import BookingDetail from "../Pages/User/BookingDetail";
import BookingList from "../Pages/User/BookingList";


const UserLayout = () => {
  useAuthUser();
 
  return (
    <>
    <Navbar />
      <div className=" max-w-screen-xl mx-auto rounded-2xl" style={{backgroundImage:"url(https://res.cloudinary.com/dpfnxwvps/image/upload/c_crop,h_3336,w_1488/v1681457153/13260_g3udrj.avif)"}}>
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/profile" element={<Private><Profile/></Private>} />
          <Route path="/job/:jobId" element={<Private><Detail /></Private>} />
          <Route path="/job/schedule/:id" element={<Private><ScheduleJob /></Private>} />
          <Route path="/bookings/:id" element={<Private><BookingDetail /></Private>} />
          <Route path="/bookings" element={<Private><BookingList /></Private>} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />

    </>
  );
};
export default UserLayout;

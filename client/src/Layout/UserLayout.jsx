import useAuthUser from "../hooks/useAuthUser";
import React from "react"
import {Route, Routes} from "react-router-dom"
import Footer from "../Components/Footer/Footer"
import MainPage from "../Pages/User/MainPage"
import  Navbar  from "../Components/Navbar/Navbar"
import ErrorPage from "../Pages/Error/Error"
import Profile from "../Pages/User/Profile";
import UserPrivate from "../ProtectedRoutes/UserPrivate";
import Detail from "../Pages/User/Detail";


const UserLayout = () => {
  // useAuthUser();
  return (
    <>
    <Navbar />
      <div className=" max-w-screen-xl mx-auto" style={{backgroundImage:"url(https://res.cloudinary.com/dpfnxwvps/image/upload/c_crop,h_3336,w_1488/v1681457153/13260_g3udrj.avif)"}}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/profile" element={<UserPrivate><Profile/></UserPrivate>} />
          <Route path="/job" element={<UserPrivate><Detail/></UserPrivate>} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />

    </>
  );
};
export default UserLayout;

import useAuthUser from "../hooks/useAuthUser";
import React from "react"
import {Route, Routes} from "react-router-dom"
import Footer from "../Components/Footer/Footer"
import MainPage from "../Pages/User/MainPage"
import  Navbar  from "../Components/Navbar/Navbar"
import ErrorPage from "../Pages/Error/Error"


const UserLayout = () => {
  useAuthUser();
  return (
    <>
      <Navbar />
      <div className="lg:px-60 md:px-20 bg-gray-100 bg-texture texture-stripes">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};
export default UserLayout;

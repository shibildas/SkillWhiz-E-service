import React from "react"
import {Outlet} from "react-router-dom"
import Footer from "../Components/Footer/Footer"
import  Navbar  from "../Components/Navbar/Navbar"

const UserLayout = () => {
 
  return (
    <>
    <Navbar />
      <div className=" max-w-screen-xl mx-auto rounded-2xl" style={{backgroundImage:"url(https://res.cloudinary.com/dpfnxwvps/image/upload/c_crop,h_3336,w_1488/v1681457153/13260_g3udrj.avif)"}}>
        <Outlet/>
      </div>
      <Footer />

    </>
  );
};
export default UserLayout;

import React from "react"
import {Outlet} from "react-router-dom"
import Footer from "../Components/Footer/Footer"
import  Navbar  from "../Components/Navbar/Navbar"
import Alert from "../Components/Alert/Alert";

const UserLayout = () => {
 
  return (
    <>
    <Navbar />
      <div className=" max-w-screen-xl mx-auto rounded-2xl">
        <Alert/>
        <Outlet/>
      </div>
      <Footer teal={"text-purple-800"} />

    </>
  );
};
export default UserLayout;

import React, { useState } from "react"
import {Route} from "react-router-dom"
import Footer from "../Footer/Footer"
import MainPage from "../MainPage/MainPage"
import  Navbar  from "../Navbar/Navbar"



const UserLayout=()=>{

  
 
    return(
    <>
    <Navbar />
    <MainPage/>
    <Footer/>
    </>)
}
export default UserLayout

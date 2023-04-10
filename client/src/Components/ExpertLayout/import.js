import { Route, Routes } from "react-router-dom"
import ExpertHome from "../ExpertHome/ExpertHome"
import ExpertNav from "../ExpertHome/ExpertNav"
import Footer from "../Footer/Footer"
import ErrorPage from "../Error/Error"
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../axios/axios"
import { AppContext } from "../../context/context";
import OTP from "./OTP";
export {Route, Routes,ExpertHome,ExpertNav,Footer,ErrorPage ,useContext, useState,useNavigate,Swal,axios,AppContext,OTP}

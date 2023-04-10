import axios from "./axios/axios";
import UserLayout from "./Components/UserLayout/UserLayout";
import ErrorPage from "./Components/Error/Error";
import AdminLogin from "./Components/Admin/AdminLogin/AdminLogin";
import LoginExpert from "./Components/ExpertLayout/LoginExpert";
import { login } from "./redux/user";


import AdminPrivate from "./Protected/AdminPrivate";
import AdminPublic from "./Protected/AdminPublic";
import ExpertPrivate from "./Protected/ExpertPrivate";
import ExpertPublic from "./Protected/ExpertPublic";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { expertlogin } from "./redux/expert";
import { adminlogin } from "./redux/admin";


export {adminlogin,expertlogin,login,axios,UserLayout, ErrorPage, AdminLogin, LoginExpert,AdminPrivate,
    AdminPublic,ExpertPrivate,ExpertPublic, BrowserRouter, Routes, Route }
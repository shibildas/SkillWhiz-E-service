
import UserLayout from "./Layout/UserLayout";
import ErrorPage from "./Pages/Error/Error";
import AdminLogin from "./Pages/Admin/AdminLogin";
import LoginExpert from "./Pages/Expert/LoginExpert";
import { login } from "./redux/user";


import AdminPrivate from "./ProtectedRoutes/AdminPrivate";
import AdminPublic from "./ProtectedRoutes/AdminPublic";
import ExpertPrivate from "./ProtectedRoutes/ExpertPrivate";
import ExpertPublic from "./ProtectedRoutes/ExpertPublic";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { expertlogin } from "./redux/expert";
import { adminlogin } from "./redux/admin";


export {adminlogin,expertlogin,login,UserLayout, ErrorPage, AdminLogin, LoginExpert,AdminPrivate,
    AdminPublic,ExpertPrivate,ExpertPublic, BrowserRouter, Routes, Route }
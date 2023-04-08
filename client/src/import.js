import axios from "./axios/axios";
import { login } from "./redux/user";
import UserLayout from "./Components/UserLayout/UserLayout";
import ExpertLayout from "./Components/ExpertLayout/ExpertLayout";
import ErrorPage from "./Components/Error/Error";
import AdminLogin from "./Components/Admin/AdminLogin/AdminLogin";
import AdminLayout from "./Components/Admin/Layout/AdminLayout";
import LoginExpert from "./Components/ExpertLayout/LoginExpert";
import { adminlogin } from "./redux/admin";
import { expertlogin } from "./redux/expert";
import { AppContext } from "./context/context";



export {axios,login,adminlogin,expertlogin,AppContext,UserLayout,ExpertLayout,ErrorPage,AdminLogin,AdminLayout,LoginExpert}
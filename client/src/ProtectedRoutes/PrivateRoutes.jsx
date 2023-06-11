import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { authUser } from "../Services/userApi";
import { login, logout } from "../redux/user";
import { authAdmin } from "../Services/adminApi";
import { adminlogin, adminlogout } from "../redux/admin";
import { authExpert } from "../Services/expertApi";
import { expertlogin, expertlogout } from "../redux/expert";

function PrivateRoutes({ role, route }) {
  const dispatch = useDispatch();
  let [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "user") {
      authUser()
        .then((response) => {
          if (!response.data.auth) {
            localStorage.removeItem("token");
            dispatch(logout());
          } else if (response.data.auth) {
            dispatch(login(response.data));
          }
          setAuth(response.data?.auth);
        })
        .catch((response) => {
          console.log(response);
          setAuth(response.data?.auth);
          navigate("/");
        });
    } else if (role === "admin") {
      authAdmin()
        .then((resp) => {
          if (!resp.data.auth) {
            localStorage.removeItem("admintoken");
            dispatch(adminlogout());
          } else if (resp.data.auth) {
            dispatch(adminlogin(resp.data.result));
          }
          setAuth(resp.data.auth);
        })
        .catch((resp) => {
          setAuth(resp.data?.auth);
          navigate("/admin/login");
        });
    } else if (role === "expert") {
      authExpert()
        .then((resp) => {
          if (!resp.data.auth) {
            localStorage.removeItem("experttoken");
            dispatch(expertlogout());
          } else {
            dispatch(expertlogin(resp.data));
          }
          setAuth(resp.data.auth);
        })
        .catch((resp) => {
          setAuth(resp.data?.auth || null);
          navigate("/expert/login");
        });
    }
  }, []);

  if (auth == null) return;

  return auth ? <Outlet /> : <Navigate to={route} />;
}

export default PrivateRoutes;

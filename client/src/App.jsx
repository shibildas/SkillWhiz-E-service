import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  axios,
  login,
  adminlogin,
  expertlogin,
  AppContext,
  UserLayout,
  ExpertLayout,
  ErrorPage,
  AdminLogin,
  AdminLayout,
  LoginExpert,
} from "./import";

function App() {
  const [user, setUser] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [expert, setExpert] = useState(false);
  const dispatch = useDispatch();
 

  useEffect(() => {
    axios
      .get("isUserAuth", {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {
        if (!response.data.auth) {
          setUser(false);
        } else {
          setUser(true);
          dispatch(login(response.data));
        }
      });
  }, [user]);
  useEffect(() => {
    axios
      .get("/admin/isAdminAuth", {
        headers: { "x-access-admintoken": localStorage.getItem("admintoken") },
      })
      .then((res) => {
        if (!res.data.auth) {
          setAdmin(false);
        } else {
          setAdmin(true);
          dispatch(adminlogin(res.data));
        }
      });
  }, [admin]);

  useEffect(() => {
    axios
      .get("/expert/isExpertAuth", {
        headers: {
          "x-access-experttoken": localStorage.getItem("experttoken"),
        },
      })
      .then((res) => {
        if (!res.data.auth) {
          setExpert(false);
        } else {
          setExpert(true);
          dispatch(expertlogin(res.data));
        }
      });
  }, [expert]);

  return (
    <AppContext.Provider
      value={{
        user:user,
        setUser:setUser,
        admin: admin,
        setAdmin: setAdmin,
        expert: expert,
        setExpert: setExpert,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={UserLayout} />
          {expert ? (
            <Route exact path="/expert" Component={ExpertLayout} />
          ) : (
            <Route path="/expert" Component={LoginExpert} />
          )}
          {admin ? (
            <Route exact path="/admin/*" Component={AdminLayout} />
          ) : (
            <Route path="/admin" Component={AdminLogin} />
          )}
          <Route path="*" Component={ErrorPage} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;

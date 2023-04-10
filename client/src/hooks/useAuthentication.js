import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { axios, login, adminlogin, expertlogin } from "../import";

function useAuthentication() {
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
  }, []);

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
  }, []);

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
  }, []);

  return [user, setUser, admin, setAdmin, expert, setExpert];
}
export default useAuthentication
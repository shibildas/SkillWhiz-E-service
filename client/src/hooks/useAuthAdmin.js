import { useCallback, useEffect} from "react";
import { useDispatch } from "react-redux";
import { axios, adminlogin } from "../import";
import { adminlogout } from "../redux/admin";

function useAuthAdmin(){
    const dispatch = useDispatch();
  
    const checkAdminAuth = useCallback(() => {
        axios
          .get("/admin/isAdminAuth", {
            headers: { "x-access-admintoken": localStorage.getItem("admintoken") },
          })
          .then((res) => {
            if (!res.data.auth) {
              dispatch(adminlogout());
            } else {
              dispatch(adminlogin(res.data));
            }
          });
      }, [dispatch]);

    useEffect(() => {
        checkAdminAuth();
      }, [checkAdminAuth]);
      return useAuthAdmin
}

export default useAuthAdmin;

import { useCallback, useEffect} from "react";
import { useDispatch } from "react-redux";
import { adminlogin } from "../import";
import { adminlogout } from "../redux/admin";
import { adminAxiosInstance } from "../axios/instance";

function useAuthAdmin(){
    const dispatch = useDispatch();
  
    const checkAdminAuth = useCallback(() => {
        adminAxiosInstance.get("/isAdminAuth")
          .then((res) => {
            if (!res.data.auth) {
              dispatch(adminlogout());
              localStorage.clear("admintoken")
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

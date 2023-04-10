import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { axios, login } from "../import";
import { logout } from "../redux/user";

function useAuthUser(){
  
    const dispatch = useDispatch();
    
    useEffect(() => {
      axios
          .get("/isUserAuth", {
            headers: { "x-access-token": localStorage.getItem("token") },
          })
          .then((response) => {
            if (!response.data.auth) {
              dispatch(logout())
            } else {
              dispatch(login(response.data));
            }
          });
    }, []);

   
  
}

export default useAuthUser;

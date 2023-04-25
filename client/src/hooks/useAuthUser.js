import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../import";
import { logout } from "../redux/user";
import { userAxiosInstance } from "../axios/instance";
import { useNavigate } from "react-router-dom";

function useAuthUser(){
    const navigate=useNavigate()
    const dispatch = useDispatch();
    
    useEffect(() => {
      const modal=document.getElementById("my-modal-3")
      userAxiosInstance.get("/isUserAuth")
          .then((response) => {
            if (!response.data.auth) {
              dispatch(logout())
              modal.checked=true
            } else {
              dispatch(login(response.data));
              navigate('/')
              modal.checked=false

            }
          });
    }, []);

   
  
}

export default useAuthUser;

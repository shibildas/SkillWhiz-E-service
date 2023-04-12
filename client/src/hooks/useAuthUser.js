import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { axios, login } from "../import";
import { logout } from "../redux/user";

function useAuthUser(){
  
    const dispatch = useDispatch();
    
    useEffect(() => {
      const modal=document.getElementById("my-modal-3")
      axios
          .get("/isUserAuth", {
            headers: { "x-access-token": localStorage.getItem("token") },
          })
          .then((response) => {
            if (!response.data.auth) {
              dispatch(logout())
              modal.checked=true
            } else {
              dispatch(login(response.data));
              modal.checked=false

            }
          });
    }, []);

   
  
}

export default useAuthUser;

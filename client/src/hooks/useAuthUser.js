import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../import";
import { logout } from "../redux/user";
import { authUser } from "../Services/userApi";

function useAuthUser() {
  const dispatch = useDispatch();
  useEffect(() => {
    const modal = document.getElementById("my-modal-3");
    authUser().then((response) => {
      if (!response.data.auth) {
        dispatch(logout());
        // localStorage.clear("token")
        modal.checked = true;
      } else {
        dispatch(login(response.data));
        modal.checked = false;
      }
    });
  }, []);
}

export default useAuthUser;

import { useEffect} from "react";
import { useDispatch } from "react-redux";
import { axios, expertlogin } from "../import";
import { expertlogout } from "../redux/expert";

function useAuthExpert() {
  const dispatch = useDispatch();

useEffect(() => {
    axios
      .get("/expert/isExpertAuth", {
        headers: {
          "x-access-experttoken": localStorage.getItem("experttoken"),
        },
      })
      .then((res) => {
        if (!res.data.auth) {
          dispatch(expertlogout())
        } else {
          dispatch(expertlogin(res.data));
        }
      });
  }, []);

  
}

export default useAuthExpert;

import { useCallback, useEffect} from "react";
import { useDispatch } from "react-redux";
import { axios, expertlogin } from "../import";
import { expertlogout } from "../redux/expert";

function useAuthExpert() {
  const dispatch = useDispatch();
  const getExpert=useCallback(()=>{

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
  },[dispatch])

useEffect(() => {
  getExpert()
  }, [getExpert]);
  return useAuthExpert

  
}

export default useAuthExpert;

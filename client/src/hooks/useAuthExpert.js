import { useCallback, useEffect} from "react";
import { useDispatch } from "react-redux";
import { axios, expertlogin } from "../import";
import { expertlogout } from "../redux/expert";
import { expertAxiosInstance } from "../axios/instance";

function useAuthExpert() {
  const dispatch = useDispatch();
  const getExpert=useCallback(()=>{

    axios.get("/expert/isExpertAuth",{headers:{"x-access-experttoken":localStorage.getItem("experttoken")}}).then((res) => {
        if (!res.data.auth) {
          dispatch(expertlogout())
        } else {
          dispatch(expertlogin(res.data));
        }
      }).catch(error=>{
        console.log(error);
      })
  },[dispatch])

useEffect(() => {
  getExpert()
  }, [getExpert]);
  return useAuthExpert

  
}

export default useAuthExpert;

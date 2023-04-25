import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import { adminAxiosInstance } from "../axios/instance";

const useGerExperts = () => {
  const[load,setLoad]=useState(false)
  const [datas, setData] = useState([]);
  const handleLoad=()=>{
    setLoad(!load)
  }

  const fetchExperts = useCallback(() => {
    adminAxiosInstance
      .get("/getExperts")
      .then((res) => {
        if (res.data.status === "success") {
          setData(res.data.result);
        } else {
          Swal.fire("Sorry", "Couldn't fetch Data", "error");
        }
      })
      .catch((error) => {
        Swal.fire("Sorry", error.message, "error");
      });
  }, []);

  useEffect(() => {
    fetchExperts();
  }, [fetchExperts,load]);

  return [datas,handleLoad];
};
export default useGerExperts
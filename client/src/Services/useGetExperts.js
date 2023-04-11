import { useEffect, useState, useCallback } from "react";
import axios from "../axios/axios";
import Swal from "sweetalert2";

const useGerExperts = () => {
  const [datas, setData] = useState([]);

  const fetchExperts = useCallback(() => {
    axios
      .get("/admin/getExperts", {
        headers: { "x-access-admintoken": localStorage.getItem("admintoken") },
      })
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
  }, [fetchExperts]);

  return datas;
};
export default useGerExperts
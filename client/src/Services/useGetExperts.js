import { useEffect, useState, useCallback } from "react";
import { getExperts } from "./adminApi";

const useGerExperts = () => {
  const [load, setLoad] = useState(false);
  const [datas, setData] = useState([]);
  const handleLoad = () => {
    setLoad(!load);
  };

  const fetchExperts = useCallback(() => {
    getExperts().then((res) => {
      if (res.data.status === "success") {
        setData(res.data.result);
      }
    });
  }, []);

  useEffect(() => {
    fetchExperts();
  }, [fetchExperts, load]);

  return [datas, handleLoad];
};
export default useGerExperts;

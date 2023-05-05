import { useEffect, useState } from "react";
import { services } from "../../constants/constants";
import Banner from "../../Components/Banner/Banner";
import Invite from "../../Components/Invite/Invite";
import useAuthUser from "../../hooks/useAuthUser";
import { Link } from "react-router-dom";
import { userAxiosInstance } from "../../axios/instance";
import { useDispatch } from "react-redux";
import { showAlertError } from "../../Services/showAlert";

const MainPage = () => {
  useAuthUser();
  const dispatch = useDispatch();
  const [show, setShow] = useState();
  const [jobs, setJobs] = useState();
  useEffect(() => {
    setShow(true);
    userAxiosInstance
      .get("/get7Jobs")
      .then((res) => {
        if (res.data.status === "success") {
          setJobs(res.data.result);
        } else {
          showAlertError(dispatch, "Couldnt connect server");
        }
      })
      .catch((error) => {
        showAlertError(dispatch, error.message);
      });
  }, []);

  return (
    <>
      <Banner />
      <div className=" my-10 card border border-stone-400 rounded-2xl shadow-2xl bg-opacity-80 bg-slate-200 mx-2">
        <div className="card-body">
          <h1 className="p-5 font-extrabold md:text-4xl underline underline-offset-8">
            MOST USED SERVICES
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {jobs?.map((ele, index) => {
              return (
                <Link
                  to={`/job/${encodeURIComponent(ele?.job_role)}`}
                  className="flex flex-col justify-center items-center md:my-8 "
                  key={"A" + index}
                >
                  <img
                    className="w-24 rounded-full cursor-pointer shadow-black shadow-2xl"
                    src={ele?.image}
                    alt="image"
                  />
                  <h1 className="p-2 font-extrabold cursor-pointer break-all mx-2 ">
                    {ele?.job_role?.toUpperCase()}
                  </h1>
                </Link>
              );
            })}
            <Link to="/alljobs">
              <span className="flex flex-col justify-center items-center md:my-8 ">
                <img
                  className="w-24 rounded-full cursor-pointer shadow-black shadow-2xl"
                  src={services?.img}
                  alt="image"
                />
                <h1 className="p-2 font-extrabold cursor-pointer">
                  {services?.val}
                </h1>
              </span>
            </Link>
          </div>
        </div>
      </div>
      <Invite show={show} />
    </>
  );
};
export default MainPage;

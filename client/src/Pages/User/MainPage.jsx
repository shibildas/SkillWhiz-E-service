import { useEffect, useState } from "react";
import { services } from "../../constants/constants";
import Banner from "../../Components/Banner/Banner";
import Invite from "../../Components/Invite/Invite";
import Swal from "sweetalert2";
import useAuthUser from "../../hooks/useAuthUser";
import { Link } from "react-router-dom";
import { userAxiosInstance } from "../../axios/instance";

const MainPage = () => {
  useAuthUser()

  const [show, setShow] = useState();
  const [jobs,setJobs]= useState()
  useEffect(() => {
    setShow(true);
    userAxiosInstance.get("/get7Jobs").then((res)=>{
      if(res.data.status==="success"){
        setJobs(res.data.result)
      }else{

        Swal.fire("Sorry","Couldnt connect server","error")
      }
    }).catch((error)=>{
      Swal.fire("Sorry",error.message,"error")

    })
  }, []);

  return (
    <>
          <Banner />
      <div className=" my-10  border border-stone-400 rounded-2xl shadow-2xl bg-opacity-80 bg-slate-200">
        <h1 className="p-5 font-extrabold md:text-4xl">MOST USED SERVICES</h1>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {jobs?.map((ele, index) => {
            return (
              <Link to={`/job/${encodeURIComponent(ele?.job_role)}`} onClick={()=> setJob(ele)}
                className="flex flex-col justify-center items-center "
                key={"A" + index}
              >
                <img className="w-32 rounded-full cursor-pointer shadow-black shadow-2xl" src={ele?.image} alt="" />
                <h1 className="p-2 font-extrabold cursor-pointer ">{ele?.job_role?.toUpperCase()}</h1>
              </Link>
            );
          })}
          <span
                className="flex flex-col justify-center items-center "
               
              >
                <img className="w-32 rounded-full cursor-pointer shadow-black shadow-2xl" src={services.img} alt="image" />
                <h1 className="p-2 font-extrabold cursor-pointer">{services.val}</h1>
              </span>
        </div>
      </div>
      <Invite show={show} />
    </>
  );
};
export default MainPage;

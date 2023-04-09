import { useEffect, useState } from "react";
import AddJobs from "./AddJobs";
import axios from "../../../axios/axios";

const Jobs = () => {
  const [load, setLoad]=useState()
  const [datas, setData] = useState();

  const handleLoad=()=>{
    setLoad(!load)
  }

  useEffect(() => {
    axios
      .get("/admin/getJobs", {
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
  }, [load]);
  return (
    <div className="p-5 m-5">
      <AddJobs  handleLoad={handleLoad} load={load}/>
      <div className="flex justify-between">
      <h1 className="p-3 font-extrabold md:text-5xl sm:text-2xl tracking-widest">
        Experts
      </h1>
      <label
        htmlFor="Add-jobs"
        className="btn btn-success my-2 float-right"
      >
        Add Jobs <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-6 w-6 bi bi-building-add" viewBox="0 0 16 16">
  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Z"/>
  <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6.5a.5.5 0 0 1-1 0V1H3v14h3v-2.5a.5.5 0 0 1 .5-.5H8v4H3a1 1 0 0 1-1-1V1Z"/>
  <path d="M4.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z"/>
</svg>
      </label></div>
      <div className="overflow-x-auto w-full shadow-black shadow-2xl rounded-xl">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th className="text-2xl">Sl no.</th>
              <th className="text-2xl">Job Role</th>
              <th className="text-2xl">Listed</th>
              <th className="text-2xl">Base Rate</th>
              <th className="text-2xl">Additional</th>
              <th className="text-2xl">Edit </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {datas?.map((data, index) => {
              return (
                <tr key={index + 10} className="focus:active">
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={
                              data?.image
                                ? data.image
                                : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                            }
                            alt="PIC"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{data?.job_role?.toUpperCase()}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {data?.listed ? "true" : "false"}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {data?.listed ? "listed" : "unlisted"}
                    </span>
                  </td>
                  <th>{data.base_rate} ₹ </th>
                  <th>{data.add_rate} ₹/Hr</th>
                  <th>
                    <button className="btn btn-ghost">Edit</button>
                  </th>
                </tr>
              );
            })}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th className="text-2xl">Sl no.</th>
              <th className="text-2xl">Job Role</th>
              <th className="text-2xl">Listed</th>
              <th className="text-2xl">Base Rate</th>
              <th className="text-2xl">Additional</th>
              <th className="text-2xl">Edit </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Jobs;

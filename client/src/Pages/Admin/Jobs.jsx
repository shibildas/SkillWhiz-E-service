import { useEffect, useState } from "react";
import AddJobs from "../../Components/Admin/Jobs/AddJobs";
import EditJobs from "../../Components/Admin/Jobs/EditJobs";
import { getJobs, listJob, unListJob } from "../../Services/adminApi";
import { FcPortraitMode } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { showAlertError, showAlertSuccess } from "../../Services/showAlert";
import Search from "../../Components/Search/Search";
import { filterJobs } from "../../Services/useSearch";
import Confirm from "../../Components/Confirm/Confirm";

const Jobs = () => {
  const dispatch = useDispatch();
  const arra = [0, 1, 2, 3, 4];
  const [load, setLoad] = useState(false);
  const [datas, setData] = useState();
  const [filteredDatas, setFilteredDatas] = useState();
  const [filter, setFilter] = useState(null);
  const [job, setJob] = useState();
  const [args, setArgs] = useState({});

  const handleLoad = () => {
    setLoad(!load);
  };

  useEffect(() => {
    getJobs()
      .then((res) => {
        if (res.data.status === "success") {
          setData(res.data.result);
          setFilteredDatas(res.data.result);
        } else {
          showAlertError(dispatch, "Couldn't fetch Data");
          setLoad(false);
        }
      })
      .catch((error) => {
        showAlertError(dispatch, error.message);
      });
  }, [load]);

  const handleUnList = () => {
    const confirmmodal = document.getElementById("confirm");

    if (args.listed) {
      unListJob(args?._id)
        .then((res) => {
          if (res.data.status === "success") {
            confirmmodal.checked = false;
            handleLoad();
            setArgs({});
            showAlertSuccess(dispatch, "Job has been unListed.");
          } else {
            showAlertError(dispatch, "something went wrong");
          }
        })
        .catch((error) => {
          showAlertError(dispatch, error.message);
        });
    } else if (!args.listed) {
      listJob(args?._id)
        .then((res) => {
          if (res.data.status === "success") {
            confirmmodal.checked = false;
            handleLoad();
            setArgs({});
            showAlertSuccess(dispatch, "Job has been Listed.");
          } else {
            showAlertError(dispatch, "something went wrong");
          }
        })
        .catch((error) => {
          showAlertError(dispatch, error.message);
        });
    }
  };
  const handleFilters = (args) => {
    setFilter(args);
  };
  const handleSearch = (searchText) => {
    const data = filterJobs([searchText, filter], datas);
    setFilteredDatas(data);
  };
  return (
    <div className="p-5 m-5">
      <AddJobs handleLoad={handleLoad} load={load} />
      <div className="flex justify-between">
        <h1 className="p-3 font-extrabold md:text-5xl sm:text-2xl tracking-widest underline underline-offset-4">
          Jobs
        </h1>
        <Search
          handleSearch={handleSearch}
          setFilter={handleFilters}
          filterList={["Role"]}
        />
        <label
          htmlFor="Add-jobs"
          className="btn btn-outline my-2 float-right shadow-black shadow-2xl"
        >
          Add Jobs <FcPortraitMode style={{ width: "20px" }} />
        </label>
      </div>
      <div className="overflow-x-auto w-full shadow-black shadow-2xl rounded-xl">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="text-2xl  bg-slate-400 text-stone-700">Sl no.</th>
              <th className="text-2xl  bg-slate-400 text-stone-700">
                Job Icon
              </th>
              <th className="text-2xl  bg-slate-400 text-stone-700">
                Job Role
              </th>
              <th className="text-2xl  bg-slate-400 text-stone-700">Listed</th>
              <th className="text-2xl  bg-slate-400 text-stone-700">
                Base Rate
              </th>
              <th className="text-2xl  bg-slate-400 text-stone-700">
                Additional
              </th>
              <th className="text-2xl  bg-slate-400 text-stone-700">Edit </th>
            </tr>
          </thead>
          <tbody>
            {filteredDatas
              ? filteredDatas?.map((data, index) => {
                  return (
                    <tr
                      key={index + 10}
                      className={index % 2 == 0 ? "active" : "hover"}
                    >
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
                        </div>
                      </td>
                      <td>
                        <div>
                          <div className="font-bold">
                            {data?.job_role?.toUpperCase()}
                          </div>
                        </div>
                      </td>
                      <td>
                        <label
                          htmlFor="confirm"
                          onClick={() => setArgs(data)}
                          className={`btn ${
                            data?.listed ? "btn-warning" : "btn-success"
                          } font-extrabold`}
                        >
                          {data?.listed ? "UnList" : "List"}
                        </label>
                      </td>
                      <th>₹ {data.base_rate} </th>
                      <th>₹ {data.add_rate} /Hr</th>
                      <th>
                        <label
                          htmlFor="editJobs"
                          onClick={() => setJob(data)}
                          className="btn"
                        >
                          Edit
                        </label>
                      </th>
                    </tr>
                  );
                })
              : arra.map((e) => {
                  return (
                    <tr key={e} className={e % 2 == 0 ? "active" : ""}>
                      <td colSpan="8">
                        <div className="animate-pulse flex space-x-4">
                          <div className="rounded-full bg-gray-400 h-12 w-12"></div>
                          <div className="flex-1 space-y-4 py-1">
                            <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                            <div className="space-y-2">
                              <div className="h-4 bg-gray-400 rounded"></div>
                              <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
      <EditJobs job={job} handleLoad={handleLoad} />
      <Confirm handleFunction={handleUnList} />
    </div>
  );
};

export default Jobs;

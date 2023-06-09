import { useEffect, useState } from "react";
import Verification from "../../Components/Admin/Verification/Verification";
import useGerExperts from "../../Services/useGetExperts";
import EditExpert from "../../Components/Admin/EditExpert/EditExpert";
import AddSlots from "../../Components/Admin/AddSlots/AddSlots";

import { blockExpert, unBlockExpert } from "../../Services/adminApi";
import { filterUsers } from "../../Services/useSearch";
import Search from "../../Components/Search/Search";
import Confirm from "../../Components/Confirm/Confirm";
import { useDispatch } from "react-redux";
import { showAlertError, showAlertSuccess } from "../../Services/showAlert";

const ExpertList = () => {
  const dispatch = useDispatch();
  const [expert, setExpert] = useState({});
  const [datas, handleLoad] = useGerExperts([]);
  const [filterdDatas, setFilteredDatas] = useState([]);
  const [filter, setFilter] = useState(null);
  const [data, setData] = useState({});
  const arra = [0, 1, 2, 3, 4];
  useEffect(() => {
    setFilteredDatas(datas);
  }, [datas]);
  const handleBlock = () => {
    const confirmmodal = document.getElementById("confirm");
    if (data?.isBanned) {
      unBlockExpert(data?._id)
        .then((res) => {
          if (res.data.status === "success") {
            handleLoad();
            setData({});
            confirmmodal.checked = false;
            showAlertSuccess(dispatch, "User has been unBlocked.");
          } else {
            showAlertError(dispatch, "something went wrong");
          }
        })
        .catch((error) => {
          showAlertError(dispatch, error.message);
        });
    } else if (!data?.isBanned) {
      blockExpert(data?._id)
        .then((res) => {
          if (res.data.status === "success") {
            handleLoad();
            setData({});
            confirmmodal.checked = false;
            showAlertSuccess(dispatch, "User has been blocked.");
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
    const data = filterUsers([searchText, filter], datas);
    setFilteredDatas(data);
  };

  return (
    <>
      <div className="p-3">
        <h1 className="p-3 font-extrabold  md:text-5xl sm:text-2xl tracking-widest">
          Experts
        </h1>
        <div className="flex justify-center mb-2">
          <Search
            handleSearch={handleSearch}
            filterList={["Name", "E-mail", "Mobile"]}
            setFilter={handleFilters}
          />
        </div>
        <div className="overflow-x-auto w-full shadow-black shadow-2xl rounded-xl ">
          <table className="table w-full ">
            <thead>
              <tr className="">
                <th className="text-2xl bg-slate-400 text-stone-700">Sl no.</th>
                <th className="text-2xl bg-slate-400 text-stone-700">
                  Name & E-mail
                </th>
                <th className="text-2xl bg-slate-400 text-stone-700">
                  Jobs & contact
                </th>
                <th className="text-2xl bg-slate-400 text-stone-700">Status</th>
                <th className="text-2xl bg-slate-400 text-stone-700">
                  Verification
                </th>
                <th className="text-2xl bg-slate-400 text-stone-700">
                  Edit Details
                </th>
                <th className="text-2xl bg-slate-400 text-stone-700">Slots </th>
              </tr>
            </thead>
            <tbody>
              {filterdDatas?.length != 0
                ? filterdDatas?.map((data, index) => {
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
                            <div>
                              <div className="font-bold">{data?.username}</div>
                              <div className="text-sm font-bold">
                                {data?.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          Contact: +91- {data?.mobile}
                          <br />
                          <span className="max-w-screen-sm flex flex-wrap">
                            {data?.skills.map((ele) => {
                              return (
                                <h1 className="break-all badge font-semibold badge-sm p-1 m-1">
                                  {ele.job_role?.toUpperCase()}
                                </h1>
                              );
                            })}
                          </span>
                        </td>
                        <td>
                          <label
                            htmlFor="confirm"
                            onClick={() => {
                              setData(data);
                            }}
                            className={`btn  ${
                              data?.isBanned ? "btn-error" : " btn-warning"
                            } font-extrabold`}
                          >
                            {data?.isBanned ? "UnBlock" : "Block"}
                          </label>
                        </td>
                        <td className="">
                          {data?.identity?.status === "pending" && (
                            <label
                              htmlFor="exVerify"
                              onClick={() => setExpert(data)}
                              className="btn"
                            >
                              Verify
                            </label>
                          )}
                          {data?.identity?.status === "initial" && (
                            <b className="p-3 text-blue-900 font-mono">
                              Initialized
                            </b>
                          )}
                          {data?.identity?.status === "approved" && (
                            <b className="p-3 text-green-900">Completed</b>
                          )}
                        </td>
                        <th>
                          <label
                            htmlFor="editExpert"
                            onClick={() => setExpert(data)}
                            className="btn btn-ghost btn-outline"
                          >
                            Edit
                          </label>
                        </th>
                        <th>
                          {data?.identity?.status === "approved" && (
                            <label
                              htmlFor="addSlots"
                              onClick={() => setExpert(data)}
                              className="btn btn-primary"
                            >
                              Add Slots
                            </label>
                          )}
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
        <Verification expert={expert} handleLoad={handleLoad} />
      </div>
      <EditExpert expert={expert} handleLoad={handleLoad} />
      <AddSlots expert={expert} handleLoad={handleLoad} />
      <Confirm handleFunction={handleBlock} />
    </>
  );
};
export default ExpertList;

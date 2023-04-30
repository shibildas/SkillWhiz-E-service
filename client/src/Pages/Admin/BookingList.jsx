import React, { useState } from 'react'

const BookingList = () => {
    const arra = [0, 1, 2, 3, 4];
    const [datas,setDatas]=useState([])
  return (
    <>
    <div className="p-3">
      <h1 className="p-3 font-extrabold  md:text-5xl sm:text-2xl tracking-widest">
        Bookings
      </h1>
      <div className="overflow-x-auto w-full shadow-black shadow-2xl rounded-xl ">
        <table className="table w-full ">
          <thead>
            <tr className="">
              <th className="text-2xl bg-slate-400 text-stone-700">Sl no.</th>
              <th className="text-2xl bg-slate-400 text-stone-700">
                Booked Job
              </th>
              <th className="text-2xl bg-slate-400 text-stone-700">Status</th>
              <th className="text-2xl bg-slate-400 text-stone-700">Estimate Status</th>
              <th className="text-2xl bg-slate-400 text-stone-700">
                Slot Time
              </th>
              <th className="text-2xl bg-slate-400 text-stone-700">
                Booking Date
              </th>
              <th className="text-2xl bg-slate-400 text-stone-700">Invoiced </th>
              <th className="text-2xl bg-slate-400 text-stone-700">Details </th>
            </tr>
          </thead>
          <tbody>
            {datas?.length != 0
              ? datas?.map((data, index) => {
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
                            <div className="text-sm opacity-50">
                              {data?.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        Contact: +91- {data?.mobile}
                        <br />
                        <span className="badge badge-ghost badge-sm flex flex-wrap">
                          {data?.skills.map(ele=>{
                            return(ele.job_role?.toUpperCase() +", ")
                          })}
                        </span>
                      </td>
                      <td>
                        <button
                      
                        //   className={ `btn  ${data?.isBanned ? "btn-error":" btn-warning"} font-extrabold`}
                        >
                          {/* {data?.isBanned ? "UnBlock" : "Block"} */}
                        </button>
                      </td>
                      <td className="flex justify-center">
                        {data?.identity?.status === "pending" && (
                          <label
                            htmlFor="exVerify"
                         
                            className="btn"
                          >
                            Verify
                          </label>
                        )}
                        {data?.identity?.status === "initial" && (
                          <b className="p-3 text-orange-400 font-mono">Initialized</b>
                        )}
                        {data?.identity?.status === "approved" && (
                          <b className="p-3 text-green-700">Completed</b>
                        )}
                      </td>
                      <th>
                        <label
                          htmlFor="editExpert"
                      
                          className="btn btn-ghost btn-outline"
                        >
                          Edit
                        </label>
                      </th>
                      <th>
                        {data?.identity?.status === "approved" && (
                          <label
                            htmlFor="addSlots"
                     
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
      
    </div>
  </>
  )
}

export default BookingList
import { useEffect, useState } from "react";
import axios from "../../../axios/axios"
import logo from "../../../assets/logo.png";
import Swal from "sweetalert2";


const ExpertList = () => {
    const [datas, setData]=useState()

    useEffect(() => {
      axios.get("/admin/getExperts",{headers:{"x-access-admintoken":localStorage.getItem("admintoken")}}).then((res)=>{
        if(res.data.status==="success"){
            setData(res.data.result)
        }else{
            Swal.fire("Sorry","Couldn't fetch Data","error")
        }
      }).catch((error)=>{
        Swal.fire("Sorry",error.message,"error")
      })
    
      
    }, [])
    
  return (
    <>
      <div className="p-3">
        <h1 className="p-3 font-extrabold md:text-5xl sm:text-2xl tracking-widest">Experts</h1>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>Sl no.</th>
                <th>Name & E-mail</th>
                <th>Jobs</th>
                <th>Block / Unblock</th>
                <th>Edit Details</th>
                <th>Slots </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
             {datas?.map((data,index)=>{return(
              <tr key={index+10} className="focus:active">
                <th>1</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={data?.image ? data.image : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"}
                          alt="PIC"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{data?.username}</div>
                      <div className="text-sm opacity-50">{data?.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  Contact:{data?.mobile}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Desktop Support Technician
                  </span>
                </td>
                <td>{data?.isBanned ? "Banned" : "Active"}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">Edit</button>
                </th>
                <th>
                  <button className="btn btn-ghost btn-xs">Add Slots</button>
                </th>
              </tr> )})}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
              <th>Sl no.</th>
                <th>Name & E-mail</th>
                <th>Jobs</th>
                <th>Block / Unblock</th>
                <th>Edit Details</th>
                <th>Slots </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};
export default ExpertList;

import { useEffect, useState } from "react";
import {axios} from "../../import"
import Swal from "sweetalert2";

const UserList = () => {
    const [datas,setDatas]= useState()

    useEffect(() => {
        axios.get("/admin/getUsers",{headers:{"x-access-admintoken":localStorage.getItem("admintoken")}}).then((res)=>{
            if(res.data.status==="success"){
                setDatas(res.data.result)
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
        <h1 className="p-3 font-extrabold text-amber-100 md:text-5xl sm:text-2xl tracking-widest">
          Users
        </h1>
        <div className="overflow-x-auto w-full shadow-black shadow-2xl rounded-xl">
          <table className="table w-full ">
            <thead>
              <tr>
                <th className="text-2xl  bg-slate-400 text-stone-700">Sl no.</th>
                <th className="text-2xl  bg-slate-400 text-stone-700">Name & E-mail</th>
                <th className="text-2xl  bg-slate-400 text-stone-700">Mobile</th>
                <th className="text-2xl  bg-slate-400 text-stone-700">Status</th>
                <th className="text-2xl  bg-slate-400 text-stone-700">Edit Details</th>
                <th className="text-2xl  bg-slate-400 text-stone-700"></th>
              </tr>
            </thead>
            <tbody>
              {datas?.map((ele,index)=>{
                return(

                <tr key={index+110} className={(index%2==0)? "active":"hover"}>
                <th>{index+1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={ele?.image ? ele.image : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{ele?.username}</div>
                      <div className="text-sm opacity-50">{ele?.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {ele?.mobile}
                 
                  
                </td>
                <td>{ele?.isBanned ? "Blocked" : "UnBlocked"}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">Edit</button>
                </th>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>)
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default UserList;

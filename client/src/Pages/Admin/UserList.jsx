import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import EditUser from "../../Components/Admin/EditUser/EditUser";
import { blockUser, getUsers, unBlockUser } from "../../Services/adminApi";

const UserList = () => {
  const arra=[0,1,2,3,4]
    const [datas,setDatas]= useState()
    const [user,setUser]=useState()
    const [load,setLoad]=useState(false)

    const handleLoad=()=>{
      setLoad(!load)
    }
    

    useEffect(() => {
        getUsers().then((res)=>{
            if(res.data.status==="success"){
                setDatas(res.data.result)
            }else{
                Swal.fire("Sorry","Couldn't fetch Data","error")
            }
          }).catch((error)=>{
            Swal.fire("Sorry",error.message,"error")
          })
        
     
    }, [load])
    const handleBlock=(ele)=>{
      Swal.fire({
        title: 'Are you sure?',
        text: 'User will be Banned !!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes,  Confirm!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((res)=>{
        if(res.isConfirmed){
          if(ele.isBanned){
            unBlockUser(ele?._id).then((res)=>{
              if(res.data.status==="success"){
                handleLoad()
      
                Swal.fire(
                  'UnBlocked!',
                  'User has been unBlocked.',
                  'success'
                  );
  
              }
            })
          }else if(!ele.isBanned){
            blockUser(ele?._id).then((res)=>{
              if(res.data.status==="success"){
                handleLoad()
              
                Swal.fire(
                  'Blocked!',
                  'User has been blocked.',
                  'success'
                );
              }
            })
          }
        }else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your data is safe :)',
            'error'
          );
        }
      })
  
    }
    

  return (
    <>
      <div className="p-3">
        <h1 className="p-3 font-extrabold md:text-5xl sm:text-2xl tracking-widest">
          Users
        </h1>
        <div className="overflow-x-auto w-full shadow-black shadow-2xl rounded-xl">
          <table className="table w-full ">
            <thead>
              <tr>
                <th className="text-2xl  bg-slate-400 text-stone-700">Sl no.</th>
                <th className="text-2xl  bg-slate-400 text-stone-700">Image</th>
                <th className="text-2xl  bg-slate-400 text-stone-700">Name</th>
                <th className="text-2xl  bg-slate-400 text-stone-700">E-mail</th>
                <th className="text-2xl  bg-slate-400 text-stone-700">Mobile</th>
                <th className="text-2xl  bg-slate-400 text-stone-700">Status</th>
                <th className="text-2xl  bg-slate-400 text-stone-700">Edit Details</th>
              </tr>
            </thead>
            <tbody>
              {datas ? (datas?.map((ele,index)=>{
                return(

                <tr key={index+110} className={(index%2==0)? "active":"hover"}>
                <th>{index+1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={ele?.image ? ele?.image : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"}
                          alt="Avatar"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                    <div>
                      <div className="font-bold">{ele?.username?.toUpperCase()}</div>
                    </div>

                </td>
                <td>
                      <div className="text-sm font-bold ">{ele?.email}</div>

                </td>
                <td>
                  {ele?.mobile}
                 
                  
                </td>
                <td><button onClick={()=>handleBlock(ele)} className={`btn ${ele?.isBanned ? "btn-warning":"btn-error"} font-extrabold`}>{ele?.isBanned ? "UnBlock" : "Block"}</button></td>
                <th className="flex justify-center">
                  <label htmlFor="editUser" onClick={()=>setUser(ele)} className="btn btn-ghost btn-outline">Edit</label>
                </th>

              </tr>)
              })):(arra.map((e)=>{
                return(<tr key={e} className={(e%2==0)? "active":""}>
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
                </tr>)
              }))}
            </tbody>
          </table>
        </div>
        <EditUser user={user} handleLoad={handleLoad}/>
      </div>
    </>
  );
};
export default UserList;

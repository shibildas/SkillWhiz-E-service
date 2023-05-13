import { useEffect, useState } from "react";
import EditUser from "../../Components/Admin/EditUser/EditUser";
import { blockUser, getUsers, unBlockUser } from "../../Services/adminApi";
import Search from "../../Components/Search/Search";
import { filterUsers } from "../../Services/useSearch";
import { showAlertError, showAlertSuccess } from "../../Services/showAlert";
import { useDispatch } from "react-redux";
import Confirm from "../../Components/Confirm/Confirm";

const UserList = () => {
  const dispatch=useDispatch()
  const arra=[0,1,2,3,4]
    const [datas,setDatas]= useState()
    const [filterdDatas,setFilteredDatas]= useState([])
    const [user,setUser]=useState()
    const [filter,setFilter]=useState(null)
    const [load,setLoad]=useState(false)
    const [elem,setEle]=useState({})

    const handleLoad=()=>{
      setLoad(!load)
    }
    

    useEffect(() => {
        getUsers().then((res)=>{
            if(res.data.status==="success"){
                setDatas(res.data.result)
                setFilteredDatas(res.data.result)
            }else{
                showAlertError(dispatch,"Couldn't fetch Data")
            }
          }).catch((error)=>{
            showAlertError(dispatch,error.message)
          })
        
     
    }, [load])
    const handleBlock=()=>{
     const confirmmodal= document.getElementById('confirm')
          if(elem.isBanned){
            unBlockUser(elem?._id).then((res)=>{
              if(res.data.status==="success"){
                handleLoad()
                setEle({})
      showAlertSuccess(dispatch, 'User has been unBlocked.')
      confirmmodal.checked=false
              }else{
                showAlertError(dispatch,"something went wrong")

              }
            }).catch(error=>{
              showAlertError(dispatch,error.message)
            })
          }else if(!elem.isBanned){
            blockUser(elem?._id).then((res)=>{
              if(res.data.status==="success"){
                handleLoad()
              showAlertSuccess(dispatch,'User has been blocked.')
      confirmmodal.checked=false
      setEle({})
    }else{
      showAlertError(dispatch,"something went wrong")

    }
  }).catch(error=>{
    showAlertError(dispatch,error.message)
  })
          }
      
  
    }
    const handleFilters=(args)=>{
      setFilter(args)
    }
    const handleSearch=(searchText)=>{
      const data=filterUsers([searchText,filter],datas)
      setFilteredDatas(data)
    }
    

  return (
    <>
      <div className="p-3">
        <h1 className="p-3 font-extrabold md:text-5xl sm:text-2xl tracking-widest">
          Users
        </h1>
        <div className="flex justify-center mb-2">
          <Search handleSearch={handleSearch} filterList={['Name','E-mail','Mobile']} setFilter={handleFilters}/>
        </div>
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
              {filterdDatas ? (filterdDatas?.map((ele,index)=>{
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
                <td><label htmlFor="confirm" onClick={()=>setEle(ele)} className={`btn ${ele?.isBanned ? "btn-warning":"btn-error"} font-extrabold`}>{ele?.isBanned ? "UnBlock" : "Block"}</label></td>
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
      <Confirm handleFunction={handleBlock}/>
    </>
  );
};
export default UserList;

import React, { useEffect, useState } from 'react'
import { getVouchers, listVoucher, unListVoucher } from '../../Services/adminApi'
import { useDispatch } from 'react-redux'
import { showAlertError, showAlertSuccess } from '../../Services/showAlert'
import AddVoucher from '../../Components/Admin/Vouchers/AddVoucher'
import EditVoucher from '../../Components/Admin/Vouchers/EditVoucher'
import Confirm from '../../Components/Confirm/Confirm'


const VoucherList = () => {
    const dispatch=useDispatch()
    const arra=[0,1,2,3,4]
    const [id,setId]=useState('')
    const [datas,setDatas]=useState([])
    const [load,setLoad]=useState(false)
    useEffect(()=>{
        getVouchers().then((res)=>{
            if(res.data.status==="success"){
                setDatas(res.data.result)
            }else{
                showAlertError(dispatch,"something went wrong")
            }
        }).catch(error=>{
            showAlertError(dispatch,error.message)
        })
    },[load])
    const handleLoad=()=>{
        setLoad(!load)
    }
    const handleunlist=()=>{
      const confirmmodal=document.getElementById('confirm')
      if(id?.listed){
 unListVoucher(id?._id).then((res)=>{
  if(res.data.status==='success'){
    handleLoad()
      showAlertSuccess(dispatch," Voucher unlisted success")
      confirmmodal.checked=false
  }else{
    showAlertError(dispatch,'error occured')
    confirmmodal.checked=false
  }
 }).catch(error=>{
  showAlertError(dispatch,error.message)
  confirmmodal.checked=false
 })
}else if(!id?.listed){
  
  listVoucher(id?._id).then((res)=>{
    if(res.data.status==='success'){
    handleLoad()
      showAlertSuccess(dispatch," Voucher listed success")
      confirmmodal.checked=false
    }else{
      showAlertError(dispatch,'error occured')
      confirmmodal.checked=false
    }
  }).catch(error=>{
    showAlertError(dispatch,error.message)
    confirmmodal.checked=false
   })
      }
    }
  return (
    <>
      <div className="p-3">
        <h1 className="p-3 font-extrabold md:text-5xl sm:text-2xl tracking-widest underline underline-offset-2">
          Vouchers
        </h1>
        <label htmlFor="Add-vouchers" className='btn float-right my-2'>Add Voucher</label>
        <div className="overflow-x-auto w-full shadow-black shadow-2xl rounded-xl">
          <table className="table w-full ">
            <thead>
              <tr>
                <th className="text-2xl  bg-slate-400 text-stone-700">Sl no.</th>
                <th className="text-2xl  bg-slate-400 text-stone-700">Image</th>
                <th className="text-2xl  bg-slate-400 text-stone-700">Name</th>
                <th className="text-2xl  bg-slate-400 text-stone-700">Code</th>
                <th className="text-2xl  bg-slate-400 text-stone-700">Discount</th>
                <th className="text-2xl  bg-slate-400 text-stone-700">Points</th>
                <th className="text-2xl  bg-slate-400 text-stone-700">End Date</th>
                <th className="text-2xl  bg-slate-400 text-stone-700">Status</th>
                <th className="text-2xl  bg-slate-400 text-stone-700">Listed</th>
                <th className="text-2xl  bg-slate-400 text-stone-700">Edit</th>
              </tr>
            </thead>
            <tbody>
              {datas?.length ? (datas?.map((ele,index)=>{
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
                      <div className="font-bold">{ele?.vouchername?.toUpperCase()}</div>
                    </div>

                </td>
                <td>
                      <div className="text-sm font-bold ">{ele?.code?.toUpperCase()}</div>

                </td>
                <td>
                ₹ {ele?.discount}
                 
                  
                </td>
                <td>
                {ele?.points} Points
                 
                  
                </td>
                <td>
                {ele?.endDate && new Date(ele?.endDate)?.toLocaleDateString()}
                 
                  
                </td>
                <td>{new Date(ele?.endDate)> new Date() ? "Valid":"Expired"}</td>
                <td><label htmlFor='confirm' onClick={()=>setId(ele)} className={`btn ${ele?.listed ? "btn-warning":"btn-error"} font-extrabold`}>{ele?.listed ? "Unlist" : "List"}</label></td>
                <th className="flex justify-center">
                  <label htmlFor="editvoucher" onClick={()=>setId(ele)} className="btn btn-ghost btn-outline">Edit</label>
                </th>

              </tr>)
              })):(arra.map((e)=>{
                return(<tr key={e} className={(e%2==0)? "active":""}>
                  <td colSpan="10">
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
      </div>
      <AddVoucher handleLoad={handleLoad}/>
      <EditVoucher id={id}/>
      <Confirm handleFunction={handleunlist}/>
    </>
  )
}

export default VoucherList
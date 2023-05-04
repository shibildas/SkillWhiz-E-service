import React, { useState } from "react";
import { showAlertError, showAlertSuccess } from "../../../Services/showAlert";
import { useDispatch } from "react-redux";
import Alert from '../../Alert/Alert'
import { adminPay } from "../../../Services/adminApi";
const Pay = ({ booking,handleLoad }) => {
  const dispatch= useDispatch()
  const [transId,setTransId]=useState('')
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(transId===''){
      showAlertError(dispatch,"Transaction Id can't be empty")
    }else{
      adminPay({bookId:booking?._id,transId}).then((res)=>{
        if(res.data.status==="success"){
          showAlertSuccess(dispatch,"Payment Added Success")
          handleLoad()
          const paymodal=document.getElementById('pay')
          paymodal.checked=false
          setTransId('')
        }else{
          showAlertError(dispatch,"Coundnt complete payment")
        }
      }).catch(error=>{
        showAlertError(dispatch,error.message)
      })
    }

  }

  return (
    <>
      <input type="checkbox" id="pay" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="pay"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <div className=" m-3 p-2 border rounded-lg">
          <h3 className="text-xl text-center font-bold p-2">
            Are You Sure To Confirm Payment ?
          </h3>
            <div className="flex justify-center">

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-semibold">Enter Transaction Id</span>
              </label>
              <input
              value={transId?.toUpperCase()}
              onChange={(e)=>setTransId(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered input-primary w-full max-w-xs"
                />
              <label className="label"></label>
            </div>
                </div>
                <Alert/>
                <div className="flex justify-center">

            <button onClick={handleSubmit} className="btn btn-success">Mark Paid</button>
                </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pay;

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Alert from '../Alert/Alert'
import { updateNewPassword } from '../../Services/userApi'
import { showAlertError, showAlertSuccess } from '../../Services/showAlert'
import { updateExpert } from '../../Services/expertApi'

const ResetPassword = ({user}) => {
    const [newPass,setNewPass]=useState('')
    const [confirm,setConfirm]=useState('')
    const dispatch= useDispatch()
    const handlePassword=()=>{
      const resetmodal=document.getElementById('resetPass')
      if(newPass==="" || confirm ===""|| newPass.length<6 || confirm.length<6){
        showAlertError(dispatch,"length should be min 6")
      }else if(newPass!==confirm){
        showAlertError(dispatch,"password doesnt match")
      }else{
        if(user){
          updateNewPassword({password:newPass}).then((res)=>{
            if(res.data.status==="success"){
              showAlertSuccess(dispatch,"password changed success")
              setConfirm('')
              setNewPass('')
              resetmodal.checked=false
            }else{
        showAlertError(dispatch,"Update error")
            }
          }).catch((error)=>{
        showAlertError(dispatch,error.message)
          }) 
        }else{
          updateExpert({password:newPass}).then((res)=>{
            if(res.data.status==="success"){
              showAlertSuccess(dispatch,"password changed success")
              setConfirm('')
              setNewPass('')
              resetmodal.checked=false

            }else{
        showAlertError(dispatch,"Update error")
            }
          }).catch((error)=>{
        showAlertError(dispatch,error.message)
          })

          
        }
      }

    }
  return (
    <>
<input type="checkbox" id="resetPass" className="modal-toggle" />
<div className="modal">
  <div className="modal-box relative" >
    <label htmlFor="resetPass" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
    <h3 className="text-2xl font-extrabold text-center ">Change Your Password</h3>
    <Alert/>
    <div className="flex justify-center">
        <div className="form-control">

        <label className="p-2">New Password</label>
        <input  type="password"  onChange={(e)=>setNewPass(e.target.value)} value={newPass}  placeholder="Type here" className="p-2 bg-slate-300 input input-bordered input-success w-full max-w-xs" />
      

        <label className="p-2">Confirm Password</label>
        <input  type="password"  onChange={(e)=>setConfirm(e.target.value)} value={confirm}  placeholder="Type here" className="p-2 bg-slate-300 input input-bordered input-success w-full max-w-xs" />
        <div className="flex justify-center p-3">

        <button onClick={handlePassword} className=" btn btn-outline ">Submit</button>
        </div>
        </div>
       

    </div>
  </div>
</div>
        </>
  )
}

export default ResetPassword
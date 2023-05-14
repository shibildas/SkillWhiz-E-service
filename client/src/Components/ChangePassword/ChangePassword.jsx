import { useState } from "react"
import { useNavigate } from "../ExpertOTP/import"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/user"
import { showAlertError, showAlertSuccess } from "../../Services/showAlert"
import Alert from "../Alert/Alert"
import { updatePassword } from "../../Services/userApi"

const ChangePassword=()=>{
    const [old,setOld]=useState('')
    const [newPass,setNewPass]=useState('')
    const [confirm,setConfirm]=useState('')
    const navigate= useNavigate()
    const dispatch= useDispatch()

    const handlePassword=()=>{
      if(old==="" || newPass==="" || confirm ===""){
        showAlertError(dispatch,"Enter all details")

      }else if((newPass===confirm) && (old!=newPass) ){
        updatePassword({old:old,newPass:newPass}).then(res=>{
          if(res.data.status==="success"){
            const chPass= document.getElementById('chPass')
            showAlertSuccess(dispatch,"Password changed successfully. Relogin Now")
            chPass.checked=false
            localStorage.removeItem("token");
            dispatch(logout())
            navigate("/");
          }else{
            showAlertError(dispatch,"Old Password is Wrong")
          }
        }).catch(error=>{
          showAlertError(dispatch,error.message)
        })
      }else{
        showAlertError(dispatch,"cant use old password & confirm password should be same")
      }


    }
    return(
        <>
<input type="checkbox" id="chPass" className="modal-toggle" />
<div className="modal">
  <div className="modal-box relative" style={{backgroundImage:"url(https://res.cloudinary.com/dpfnxwvps/image/upload/v1681451085/cool-background_8_wi7oi3.png)"}}>
    <label htmlFor="chPass" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
    <h3 className="text-2xl font-extrabold text-center ">Change Your Password</h3>
    <Alert/>
    <div className="flex justify-center">
        <div className="form-control">

        <label className="p-2">OLD Password</label>
        <input type="password" onChange={(e)=>setOld(e.target.value)} value={old} placeholder="Type here" className="p-2 input bg-slate-300 input-bordered input-info w-full max-w-xs" />
        

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
export default ChangePassword
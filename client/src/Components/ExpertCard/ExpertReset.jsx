import { useState } from "react"
import Swal from "sweetalert2"
import { useNavigate } from "../ExpertOTP/import"
import { useDispatch } from "react-redux"
import { expertlogout } from "../../redux/expert"
import { expertAxiosInstance } from "../../axios/instance"

const ExpertReset=()=>{
    const [old,setOld]=useState('')
    const [newPass,setNewPass]=useState('')
    const [confirm,setConfirm]=useState('')
    const navigate= useNavigate()
    const dispatch= useDispatch()

    const handlePassword=()=>{
      if(old==="" || newPass==="" || confirm ===""){
        Swal.fire("Error","Enter all details","error")

      }else if((newPass===confirm) && (old!=newPass) ){
        expertAxiosInstance.post('/updatePassword',{old:old,newPass:newPass}).then(res=>{
          if(res.data.status==="success"){
            const chPass= document.getElementById('chPass')
            Swal.fire("Success","Password changed successfully. Relogin Now","")
            chPass.checked=false
            localStorage.removeItem("experttoken");
            dispatch(expertlogout())
            navigate("/expertlogin");
          }else{
            Swal.fire("Sorry","Old Password is Wrong","error")
          }
        }).catch(error=>{
          Swal.fire("Error",error.message,"error")
        })
      }else{
        Swal.fire("Sorry","cant use old password & confirm password should be same","error")
      }


    }
    return(
        <>
<input type="checkbox" id="chPass" className="modal-toggle" />
<div className="modal">
  <div className="modal-box relative" style={{backgroundImage:"url(https://res.cloudinary.com/dpfnxwvps/image/upload/v1681451085/cool-background_8_wi7oi3.png)"}}>
    <label htmlFor="chPass" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
    <h3 className="text-2xl font-extrabold text-center ">Change Your Password</h3>
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
export default ExpertReset
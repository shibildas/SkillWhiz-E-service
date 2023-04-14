import { useState } from "react"

const ChangePassword=()=>{
    const [old,setOld]=useState('')
    const [newPass,setNewPass]=useState('')
    const [confirm,setConfirm]=useState('')
    return(
        <>
   

<input type="checkbox" id="chPass" className="modal-toggle" />
<div className="modal">
  <div className="modal-box relative bg-green-700 text-white">
    <label htmlFor="chPass" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
    <h3 className="text-2xl font-extrabold text-center ">Change Your Password</h3>
    <div className="flex justify-center">
        <div className="form-control">

        <label className="p-2">OLD Password</label>
        <input type="password" onChange={(e)=>setOld(e.target.value)} value={old} placeholder="Type here" className="p-2 input bg-slate-400 input-bordered input-info w-full max-w-xs" />
        

        <label className="p-2">New Password</label>
        <input  type="password"  onChange={(e)=>setNewPass(e.target.value)} value={newPass}  placeholder="Type here" className="p-2 bg-slate-400 input input-bordered input-success w-full max-w-xs" />
      

        <label className="p-2">Confirm Password</label>
        <input  type="password"  onChange={(e)=>setConfirm(e.target.value)} value={confirm}  placeholder="Type here" className="p-2 bg-slate-400 input input-bordered input-success w-full max-w-xs" />
        <div className="flex justify-center p-3">

        <button className=" btn btn-outline btn-warning">Submit</button>
        </div>
        </div>
       

    </div>
  </div>
</div>
        </>
    )
}
export default ChangePassword
import React, { useState } from 'react'
import { adminAxiosInstance } from '../../../axios/instance'
import Swal from 'sweetalert2'

const Reason = ({id,handleLoad}) => {
    const [reason,setReason]= useState('')
    const [alert,setAlert]= useState(false)
    const handleReject=()=>{
            if(reason===""){
                setAlert(true)
             }else {const verifyex= document.getElementById("exVerify")
            const reject =  document.getElementById('reject')
                adminAxiosInstance.post(`/rejectExpert/${id}`,{reason:reason}).then(res=>{
                    if(res.data.status==="success"){
                        handleLoad()
                        reject.checked=false
                        verifyex.checked=false
                        Swal.fire(
                            'Approved!',
                            'Expert has been Rejected.',
                            'success'
                            );
                      }
                })
            }
    }
  return (
    <>
    <input type="checkbox" id="reject" className="modal-toggle" />
<div className="modal">
  <div className="modal-box relative bg-cyan-700 text-white">
    <label htmlFor="reject" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
    <h3 className="text-lg text-center font-bold">Are You Sure for Rejection?</h3>
    <div className='flex justify-center my-2'>
        <div>
    <p>Mention the reason below</p>
    <textarea placeholder="Reason here..." value={reason} className=" textarea my-2 textarea-bordered textarea-error textarea-lg w-full text-black max-w-xs" onChange={(e)=>{
        setReason(e.target.value)
        setAlert(false)
        }} ></textarea>
    </div>
    </div>
    <div className='flex justify-center my-2'>

    <button onClick={handleReject} className='btn btn-error'>Reject</button>
    </div>
    <div>

    {alert && <div className="alert alert-warning shadow-lg">
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    <span>Warning: Reason Can't be Empty </span>
  </div>
</div>}
    </div>
  </div>
</div>
    </>
  )
}

export default Reason
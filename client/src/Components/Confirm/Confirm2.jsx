import React from 'react'
import { useDispatch } from 'react-redux'
import { showAlertSuccess } from '../../Services/showAlert'

const Confirm2 = ({handleFunction}) => {
    const dispatch=useDispatch()
    const handleClose=()=>{
      const modal=document.getElementById('confirm2')

      showAlertSuccess(dispatch,'Your Data is Safe')
      modal.checked=false

    }
    const handleclick=()=>{
      handleFunction()
    }
  return (
   <>
   <input type="checkbox" id="confirm2" className="modal-toggle" />
<div className="modal">
  <div className="modal-box relative">
    <label htmlFor="confirm2"  className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 className="text-lg font-bold">Are You sure ?</h3>
    <p className="py-4 my-2">By confirming the change will be irreversible</p>
    <div className='flex justify-evenly'>
        <button onClick={handleClose} className='btn btn-warning'>cancel</button>
        <button onClick={handleclick} className='btn '>confirm</button>
    </div>
  </div>
</div>
   </>
  )
}

export default Confirm2
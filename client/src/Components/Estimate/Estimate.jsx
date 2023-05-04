import React, { useEffect, useState } from 'react'
import { showAlertError, showAlertSuccess } from '../../Services/showAlert'
import { useDispatch } from 'react-redux'
import { userApproveEstimate } from '../../Services/userApi'
import { adminApproveEstimate } from '../../Services/adminApi'
import CancelEstimate from './CancelEstimate'

const Estimate = ({admin,address,user,estimate,job,id,handleLoad}) => {
  const dispatch=useDispatch()

    const [partRate,setPartRate]=useState(null)
    const [hourRate,setHourRate]=useState(null)
    useEffect(() => {
        setPartRate(estimate?.parts?.reduce((acc,curr)=>{
            acc= parseInt(acc)+parseInt(curr.price)
               return(
                    acc
               )
        
           },[0]))
           setHourRate((job?.base_rate+(job?.add_rate*(parseInt(estimate?.hours)-2))))  
     
    }, [estimate])
    const handlePrint=()=>{
        window.print()
    }
    const handleApprove=()=>{
      const modal= document.getElementById('estimate')
      if(admin){
        adminApproveEstimate(id).then(res=>{
          if(res.data.status==="success"){
            handleLoad()
            showAlertSuccess(dispatch,"success")
            modal.checked=false
          }else{
            showAlertError(dispatch,"error occured")
            modal.checked=false
          }
        }).catch(error=>{
          showAlertError(dispatch,error.message)
          
          modal.checked=false
        })

      }else{

        userApproveEstimate(id).then(res=>{
          if(res.data.status==="success"){
            handleLoad()
            showAlertSuccess(dispatch,"success")
            modal.checked=false
          }else{
            showAlertError(dispatch,"error occured")
            modal.checked=false
          }
        }).catch(error=>{
          showAlertError(dispatch,error.message)
          
          modal.checked=false
        })
      }

    }
    const handleDecline=()=>{
    }
    
  return (
    <>
    <input type="checkbox" id="estimate" className="modal-toggle" />
<div className="modal">
  <div className="modal-box relative">
    <label htmlFor="estimate" className="btn btn-sm btn-circle absolute btn-ghost right-2 top-2">✕</label>
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h1 className="md:text-xl font-bold">Estimate</h1>
        <button onClick={handlePrint} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Download PDF</button>
      </div>
      <div className="flex justify-between mb-8 flex-wrap md:flex-nowrap">
        <div className='p-2'>
          <h2 className="text-gray-500 font-medium">From:</h2>
          <p className="font-medium">SkillWhiz</p>
          <p>Brocamp St.</p>
          <p>City, Kerala ZIP</p>
          <p>Phone: +919633450878</p>
          <p>Email: skillWhiz@outlook.com</p>
        </div>
        <div className='p-2'>
          <h2 className="text-gray-500 font-medium">To:</h2>
          <p className="font-medium">{address?.name?.toUpperCase()}</p>
          <p>{address?.house}</p>
          <p>{address?.street}, PIN:{address?.pincode}</p>
          <p>Phone: +91-{user?.mobile}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="py-2 font-medium border-b border-gray-200">Description</th>
           
            <th className="py-2 font-medium border-b border-gray-200">Price</th>

          </tr>
        </thead>
        <tbody>
          {estimate?.parts?.length!=0 && (estimate?.parts?.map((ele, index)=>{
return(

          <tr key={index+333}>
            <td className="py-2 border-b border-gray-200">{ele?.pName}</td>
     
            <td className="py-2 border-b border-gray-200">₹ {ele?.price}</td>
           
          </tr>)}))}
          <tr>
            <td className="py-2 border-b border-gray-200">Total Hours Rate ({estimate?.hours} Hrs) </td>
     
            <td className="py-2 border-b border-gray-200">₹ {hourRate}</td>
         
          </tr>
          
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="py-4 text-right font-medium">Parts Total:</td>
            <td className="py-4 font-medium">₹ {partRate}</td>
          </tr>
          <tr>
          <td colSpan="3" className="pb-4 text-right font-medium">Labour:</td>
        <td className="pb-4 font-medium">₹ {hourRate}</td>
      </tr>
      <tr>
        <td colSpan="3" className="py-4 text-right font-semibold">Total: </td>
        <td className="py-4 font-extrabold text-xl"> ₹ {parseInt(hourRate)+parseInt(partRate)}</td>
      </tr>
    </tfoot>
  </table>
  <div className="flex justify-between items-center mb-8">
        <label htmlFor='cancelEst' className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">Decline</label>
        <button onClick={handleApprove} className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">Accept</button>
      </div>
</div>


  </div>
</div>
<CancelEstimate handleLoad={handleLoad} admin={admin} id={id}/>
    
    </>
  )
}

export default Estimate
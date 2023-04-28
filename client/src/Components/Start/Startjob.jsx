import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { startJob } from '../../Services/expertApi';

const Startjob = ({id,handleLoad,handleAlert}) => {
    const [currentTime, setCurrentTime] = useState(moment().format('h:mm:ss a'));

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(moment().format('h:mm:ss a'));
      }, 1000);
  
      return () => clearInterval(timer);
    }, []);
  const currentDate = moment().format('MMMM Do YYYY');
  const handleStart=()=>{
    const modal= document.getElementById('startJob')
    startJob(id).then(res=>{
        if(res.data.status==="success"){
            modal.checked=false
            const alert=true
            const msg="Job Started successfully"
            handleLoad()
            handleAlert(alert,msg)
        }else{
            modal.checked=false
            const alert=false
            const msg ="Couldn't start job, Some Error Occured"
            handleAlert(alert,msg)
        }
    }).catch(error=>{
        modal.checked=false
        const alert=false
        const msg =error.message
        handleAlert(alert,msg)

    })
  }
  return (
    <>
    <input type="checkbox" id="startJob" className="modal-toggle" />
<div className="modal">
  <div className="modal-box relative">
    <label htmlFor="startJob" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
    <h3 className="text-lg text-center font-bold">Are You Sure To Start the Job?</h3>
    <div className='h-40'>
    <p className="py-4"></p>
    <h1 className='flex justify-around'>Start Time: <b> {currentTime}</b></h1>
      <h2 className='flex justify-around'>Start Date: <b> {currentDate}</b></h2>
    </div>
    <div className='flex justify-evenly '>
        <label htmlFor='startJob' className='btn btn-error'>Cancel</label>
        <button onClick={handleStart} className='btn btn-success'>Start</button>
    </div>
  </div>
</div>

    </>
  )
}

export default Startjob
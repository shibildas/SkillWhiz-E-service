import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Range = () => {
  const booking = useSelector((state) => state.user.value.bookings);
    const [range,setRange]=useState(null)
    const [action,setAction]=useState(false)
    useEffect(() => {
      
    }, [])

   const handleChange=()=>{
       if(range<5){
        const value= (range+1)
        setRange(value)
        if(value===2){
          const aproveEst=document.getElementById('estimate')
          aproveEst.checked=true
          setRange(1)
        
        }
        if(value===3){
          const startjob=document.getElementById('startJob')
          startjob.checked=true
          setRange(2)
          
        }

    }
   }
   useEffect(()=>{
    setAction(false)
    if(booking?.estimate?.status==="approved" && booking?.status==='pending'){
      setRange(2)
    }
    if(booking?.status==='started'){
      setRange(3)
    }

   },[booking])
    
  return (
    <>
    <input type="range" min="0" max="5" value={range} onChange={handleChange} className="range" step="1" disabled={action}  />
<div className="w-full flex justify-between text-xs px-2">
  <span className='break-all mr-2'> Open</span>
  <span className='break-all mx-2'> Assigned </span>
  <span className='break-all mx-2'> Approval </span>
  <span className='break-all mx-2'> Job Started </span>
  <span className='break-all mx-2'> Invoiced </span>
  <span className='break-all ml-2'> Paid </span>

 
</div>
    </>
  )
}

export default Range
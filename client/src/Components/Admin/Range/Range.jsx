import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Range = ({booking}) => {
  const [range,setRange]=useState(undefined)
  const handleChange=()=>{
       if(range<5){
        const value=(parseInt(range)+1)
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
        if(value===4){
          const endjob=document.getElementById('endJob')
          endjob.checked=true
          setRange(3)
          
        }if(value===5){
          const paymodal= document.getElementById('pay')
          paymodal.checked=true
          setRange(4)
        }

    }
   }
   useEffect(()=>{
    if(booking?.status==="pending"){
      setRange(1)
    }
    if(booking?.estimate?.status==="approved"){
      setRange(2)
    }
    if(booking?.status==='started'){
      setRange(3)
    }
    if(booking?.status==='completed'){
      setRange(4)
    }
    if(booking?.status==='invoiced'){
      setRange(5)
    }

   },[booking])
    
  return (
    <>
    <div className='md:pt-5'>

<input type="range" min={0} max={5} value={range} onInput={handleChange} className="range range-warning bg-white" step={1}  />
    </div>
<div className="w-full flex justify-between text-xs px-2">
  <span className={`break-all mr-2`}> Open</span>
  <span className={`break-all mr-2 ${range===1 && "font-extrabold text-lg"}`}> Assigned </span>
  <span className={`break-all mr-2 ${range===2 && "font-extrabold text-lg"}`}> Approval </span>
  <span className={`break-all mr-2 ${range===3 && "font-extrabold text-lg"}`}> Job Started </span>
  <span className={`break-all mr-2 ${range===4 && "font-extrabold text-lg"}`}> Invoiced </span>
  <span className={`break-all mr-2 ${range===5 && "font-extrabold text-lg"}`}> Paid </span>

 
</div>
    </>
  )
}

export default Range
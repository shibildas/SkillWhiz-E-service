import React, { useEffect, useState } from 'react'

const Range = () => {
    const [range,setRange]=useState(1)
    useEffect(() => {
      
    }, [])

   const handleChange=()=>{
       if(range<5){
        const value= (range+1)
        setRange(value)

    }
   }
    
  return (
    <>
    <input type="range" min="0" max="5" value={range} onChange={handleChange} className="range" step="1" />
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
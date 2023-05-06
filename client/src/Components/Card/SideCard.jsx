import React, { useState } from 'react'

const SideCard = ({title,content,image,rest}) => {
    const [show,setShow]=useState(false)
    const handleshow=()=>{
        setShow(!show)
    }
  return (
    <div className="card  bg-base-100 shadow-xl p-2 m-2 border">
  <figure className='p-2'><img className='rounded-lg ' src={image} alt="Album"/></figure>
  <div className="card-body">
    <h2 className="card-title underline underline-offset-4">{title}  </h2>
    <p>{ content} {show&& rest} <span className='font-semibold hover:text-secondary cursor-pointer text-blue-600' onClick={handleshow}>{!show ? 'view more...':'show less'}</span> </p>
  </div>
</div>
  )
}

export default SideCard


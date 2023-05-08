import React from 'react'
import {Link} from 'react-router-dom'
const Card = ({icon,topic,bg,value,route}) => {
  return (
   <Link to={route}>  
   <div className={`border ${bg} py-6 px-7 rounded-lg p-2 shadow-xl shadow-black`}>
      <div className="flex items-center justify-start rounded-full cursor-pointer">
        {icon}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-3xl font-bold text-black dark:text-white">
           Count: {value? value :0}
          </h4>
          <span className="text-2xl font-extrabold">{topic}</span>
        </div>

        <span className="flex items-center gap-1 underline underline-offset-2 cursor-pointer text-meta-3">
          more...
        </span>
      </div>
    </div></Link>
  )
}

export default Card
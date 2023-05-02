import React from 'react'

const Welcome = ({userName}) => {
  return (
    <div className="flex flex-col items-center justify-center text-white">
    <img src="https://res.cloudinary.com/dpfnxwvps/image/upload/c_scale,h_280/v1682875152/robot_gec705.gif" alt="" className="h-80" />
    <h1 className="text-4xl font-bold">
    Welcome,{" "}
    <span className="text-purple-500 font-semibold">{userName?.toUpperCase()}!</span>
    </h1>
    <h3 className="text-xl mt-4 mb-10">
    Please select a chat to start messaging.
    </h3>
    </div>
  )
}

export default Welcome
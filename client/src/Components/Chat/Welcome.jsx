import React from "react";
import { HiMenu } from "react-icons/hi";

const Welcome = ({ userName }) => {
  return (
    <>
      <div className="bg-gray-200 h-10 md:h-24 py-4 px-8 ">
        <div className="flex items-center">
          <label htmlFor="chatbox" className="cursor-pointer hidden:lg my-5">
            <HiMenu />
          </label>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-white">
        <img
          src="https://res.cloudinary.com/dpfnxwvps/image/upload/c_scale,h_280/v1682875152/robot_gec705.gif"
          alt=""
          className="h-80"
        />
        <h1 className="text-4xl font-bold">
          Welcome,{" "}
          <span className="text-purple-500 font-semibold">
            {userName?.toUpperCase()}!
          </span>
        </h1>
        <h3 className="text-xl mt-4 mb-10">
          Please select a chat to start messaging.
        </h3>
      </div>
    </>
  );
};

export default Welcome;

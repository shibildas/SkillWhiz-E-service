import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { CodeIcon } from '@heroicons/react/outline'

import { UserCircleIcon } from "@heroicons/react/solid";
// import { allUsersRoute, host } from "../utils/APIRoutes";
// import ChatContainer from "../../Components/Chat/ChatContainer";
import Welcome from "../../Components/Chat/Welcome";
import { baseUrl } from "../../constants/constants";
import ChatContainer from "../../Components/Chat/ChatContainer";
import { getExpertContacts } from "../../Services/userApi";
import { getUserContacts } from "../../Services/expertApi";

export default function Chat({currentUser,user}) {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);


  useEffect(() => {
    if (currentUser) {
      socket.current = io(baseUrl);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      if(user){
        getExpertContacts().then(res=>{
          if(res.data.status==="success"){
            setContacts(res.data.result)

          }
        })
      }else if(!user){
        getUserContacts().then(res=>{
          if(res.data.status==="success"){

            setContacts(res.data.result)
          }
        })

      }
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="container mx-auto px-4 py-4 grid grid-cols-12 gap-4">
        <div className="col-span-2 flex flex-col items-center">
          <div className="bg-gray-800 p-4 rounded-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <div className="text-white text-lg font-bold">Contacts</div>
              <CodeIcon className="text-white h-6 w-6 cursor-pointer" />
            </div>
            {contacts?.map((contact,index) => (
              <div
                key={index+921}
                className={`${
                  currentChat?._id === contact?._id
                    ? "bg-blue-500"
                    : "hover:bg-gray-700"
                } cursor-pointer p-2 rounded-lg mb-2`}
                onClick={() => handleChatChange(contact)}
              >
                <UserCircleIcon className="text-white h-6 w-6 mr-2" />
                <span className="text-white">{contact?.username}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-10 flex flex-col items-center">
          {currentChat === undefined ? (

            <Welcome />
          ) : (
            <ChatContainer data={currentUser} currentChat={currentChat} socket={socket} />
          )}
        </div>
      </div>
    </div>
  );
}

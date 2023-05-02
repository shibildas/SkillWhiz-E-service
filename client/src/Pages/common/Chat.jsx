import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { UserCircleIcon } from "@heroicons/react/solid";
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
      socket.current.emit("add-user", currentUser?._id);
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
    <div className="max-h-screen bg-gray-900 flex  justify-center">
      <div className="container mx-auto px-4 py-4 grid grid-cols-12 gap-4">
        <div className="col-span-4 md:col-span-2 flex flex-col items-center">
          <div className="bg-gray-800 p-4 rounded-lg w-full h-full">
            <div className="flex justify-between items-center mb-4">
              <div className="text-white text-lg font-bold">Contacts</div>
              
            </div>
            {contacts?.map((contact,index) => (
              <div
                key={index+921}
                className={`${
                  currentChat?.id === contact?.id
                    ? "bg-blue-500"
                    : "hover:bg-black"
                } cursor-pointer p-2 rounded-lg mb-2 flex`}
                onClick={() => setCurrentChat(contact)}
              >
                <UserCircleIcon className="text-white h-6 w-6 mr-2 md:block" />
                <span className="text-white font-bold">{contact?.username?.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-8 md:col-span-10 ">
          {currentChat === undefined ? (

            <Welcome userName={currentUser?.username}/>
          ) : (
            <ChatContainer data={currentUser} currentChat={currentChat} socket={socket} user={user}/>
          )}
        </div>
      </div>
    </div>
  );
}

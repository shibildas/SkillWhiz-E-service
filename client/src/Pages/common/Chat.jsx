import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { HiArrowCircleLeft } from "react-icons/hi";
import { UserCircleIcon } from "@heroicons/react/solid";
import Welcome from "../../Components/Chat/Welcome";
import ChatContainer from "../../Components/Chat/ChatContainer";
import { getExpertContacts } from "../../Services/userApi";
import { getUserContacts } from "../../Services/expertApi";

export default function Chat({ currentUser, user }) {
  const url = import.meta.env.VITE_LOCAL;
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(url);
      socket.current.emit("add-user", currentUser?._id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      if (user) {
        getExpertContacts().then((res) => {
          if (res.data.status === "success") {
            setContacts(res.data.result);
          }
        });
      } else if (!user) {
        getUserContacts().then((res) => {
          if (res.data.status === "success") {
            setContacts(res.data.result);
          }
        });
      }
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="drawer bg-gray-900 rounded-t-xl h-auto">
      <input id="chatbox" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {currentChat === undefined ? (
          <Welcome userName={currentUser?.username} />
        ) : (
          <ChatContainer
            data={currentUser}
            currentChat={currentChat}
            socket={socket}
            user={user}
          />
        )}
      </div>
      <div className="drawer-side  max-w-fit">
        <label htmlFor="chatbox" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-cyan-950 shadow-2xl text-white font-bold text-2xl max-w-full">
          <div className="text-white text-2xl underline underline-offset-2 font-bold p-3 m-3 flex justify-between">
            <b>Contacts</b>{" "}
            <label htmlFor="chatbox">
              <HiArrowCircleLeft className="" />
            </label>
          </div>
          {contacts?.map((contact, index) => (
            <label
              htmlFor="chatbox"
              key={index + 921}
              className={`${
                currentChat?.id === contact?.id
                  ? "bg-blue-500"
                  : "hover:bg-black"
              } cursor-pointer flex p-2  border shadow-black shadow-2xl rounded-md my-2`}
              onClick={() => setCurrentChat(contact)}
            >
              <UserCircleIcon className="text-white h-6 w-6 mr-2 md:block" />
              <span className="text-white font-bold">
                {contact?.username?.toUpperCase()}
              </span>
            </label>
          ))}
        </ul>
      </div>
    </div>
  );
}

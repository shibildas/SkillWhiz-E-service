import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.svg";
import { Button } from "react-daisyui";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserImage && (
        <div className="grid grid-rows-[10%,75%,15%] bg-[#080420] overflow-hidden">
          <div className="flex items-center justify-center gap-4">
            <img src={Logo} alt="logo" className="h-8" />
            <h3 className="text-white uppercase">snappy</h3>
          </div>

          <div className="flex flex-col items-center overflow-auto gap-2 scrollbar-thumb-white scrollbar-thumb-rounded">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`flex items-center contact w-90 ${
                    index === currentSelected ? "selected bg-[#9a86f3]" : "bg-[#ffffff34]"
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                      className="h-12"
                    />
                  </div>
                  <div className="username">
                    <h3 className="text-white">{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center items-center bg-[#0d0d30] gap-4">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
                className="h-16 w-auto"
              />
            </div>
            <div className="username">
              <h2 className="text-white">{currentUserName}</h2>
            </div>
            <Button className="text-white bg-[#9a86f3] hover:bg-[#b59cf7]">
              Logout
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

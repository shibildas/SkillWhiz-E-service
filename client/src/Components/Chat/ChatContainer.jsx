import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import { addUserMessage, getUserMessage } from "../../Services/userApi";
import { addExpertMessage, getExpertMessage } from "../../Services/expertApi";
import {AiOutlineMenu} from 'react-icons/ai'
import { FcCamcorderPro } from "react-icons/fc";
import Calls from "../../Pages/common/Calls";

export default function ChatContainer({ data, currentChat, socket, user }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    if (user) {
      getUserMessage({ from: data._id, to: currentChat.id }).then(
        (response) => {
          setMessages(response.data);
        }
      );
    } else {
      getExpertMessage({ from: data._id, to: currentChat.id }).then(
        (response) => {
          setMessages(response.data);
        }
      );
    }
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    socket.current.emit("send-message", {
      to: currentChat.id,
      from: data._id,
      msg,
    });
    if (user) {
      await addUserMessage({
        from: data._id,
        to: currentChat?.id,
        message: msg,
        model: "user",
      });
    } else {
      await addExpertMessage({
        from: data._id,
        to: currentChat?.id,
        message: msg,
        model: "expert",
      });
    }
    setMessages((prev) => [...prev, { fromSelf: true, message: msg }]);
  };

  useEffect(() => {
    if (socket?.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);
  
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <>
      <div className="w-full h-fit">
      <label htmlFor="chatbox" className="drawer-overlay"></label>

        <div className="bg-gray-200  py-4 px-8 ">
          <div className="flex items-center gap-4">
             <label htmlFor="chatbox" className="cursor-pointer hidden:lg"><AiOutlineMenu className=""/></label> 
            <div className="rounded-full overflow-hidden h-12 w-12 md:h-16 md:w-16">
             <img
                className="h-full w-full object-cover"
                src={currentChat?.image ? currentChat?.image :"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"}
                alt="avatar"
              />
            </div>

            <h3 className="font-semibold text-xl md:text-2xl">
              {currentChat?.username?.toUpperCase()}
            </h3>
            <label htmlFor="callsmodal" className="btn btn-sm"><FcCamcorderPro className="text-2xl"/></label>
          </div>
        </div>

        <div className="justify-end max-h-96 my-4 p-4 md:p-8 overflow-y-scroll text-white">
          {messages.map((message, index) => (
            <div
              key={index + 222}
              className={`chat ${
                message?.fromSelf ? "chat-end" : "chat-start"
              }`}
            >
              <div class="chat-image avatar">
                <div class="w-10 rounded-full">
                  <img src={message?.fromSelf ? data?.image : currentChat?.image} />
                </div>
              </div>
              <div class="chat-header">
              {message?.fromSelf ? data?.username?.toUpperCase() : currentChat?.username?.toUpperCase()}
              </div>
              <div
                className={`chat-bubble ${
                  message?.fromSelf
                    ? "chat-bubble-primary"
                    : "chat-bubble-secondary"
                } p-2 rounded-lg max-w-md md:max-w-2xl break-words my-2 md:my-4 font-bold`}
              >
                <p className="text-white text-lg">{message?.message}</p>
              </div>
              {message?.createdAt ? <div className="chat-footer">
    Sent@ {message?.createdAt?.split(',')[0]} <br/>
    Time@ {message?.createdAt?.split(',')[1]}
  </div>: <div className="chat-footer">
    Just Now
    </div>}
            </div>
          ))}
          <div ref={scrollRef}></div>
        </div>
      </div>
        <ChatInput handleSendMsg={handleSendMsg} />

        <Calls/>

    </>
  );
}

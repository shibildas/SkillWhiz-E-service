import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import { addUserMessage, getUserMessage } from "../../Services/userApi";
import { addExpertMessage, getExpertMessage } from "../../Services/expertApi";
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
      <div className="max-h-screen gap-1 rounded-lg w-full">
        <div className="bg-gray-200 h-20 md:h-24  py-4 px-8 rounded-t-xl ">
          <div className="flex items-center gap-4">
            <div className="rounded-full overflow-hidden h-12 w-12 md:h-16 md:w-16">
              <img
                className="h-full w-full object-cover"
                src={currentChat?.image}
                alt="avatar"
              />
            </div>
            <h3 className="font-semibold text-xl md:text-2xl">
              {currentChat?.username?.toUpperCase()}
            </h3>
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
              <div
                className={`chat-bubble ${
                  message?.fromSelf
                    ? "chat-bubble-primary"
                    : "chat-bubble-secondary"
                } p-2 rounded-lg max-w-md md:max-w-2xl break-words my-2 md:my-4 font-bold`}
              >
                <p className="text-white text-lg">{message?.message}</p>
              </div>
            </div>
          ))}
          <div ref={scrollRef}></div>
        </div>
      <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    </>
  );
}

import { useState, useEffect, useRef } from "react";
import axios from "axios";
// import { v4 as uuidv4 } from "uuid";
// import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import ChatInput from "./ChatInput";
// import Logout from "./Logout";

export default function ChatContainer({data, currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  

//   useEffect(async () => {
//     const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
//     const response = await axios.post(recieveMessageRoute, { from: data._id, to: currentChat._id });
//     setMessages(response.data);
//   }, [currentChat]);

  const handleSendMsg = async (msg) => {
    // const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    socket.current.emit("send-msg", { to: currentChat._id, from: data._id, msg });
    await axios.post(sendMessageRoute, { from: data._id, to: currentChat?._id, message: msg });
    setMessages(prev => [...prev, { fromSelf: true, message: msg }]);
  };

  useEffect(() => {
    if (socket?.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages(prev => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="grid grid-rows-10 md:grid-rows-15 gap-1 overflow-hidden h-full">
      <div className="bg-gray-800 text-white flex justify-between items-center py-4 px-8 md:py-6 md:px-16">
        <div className="flex items-center gap-4">
          <div className="rounded-full overflow-hidden h-12 w-12 md:h-16 md:w-16">
            <img className="h-full w-full object-cover" src={currentChat?.image} alt="" />
          </div>
          <h3 className="font-semibold text-xl md:text-2xl">{currentChat?.username}</h3>
        </div>
        {/* <Logout /> */}
      </div>
      <div className="flex flex-col justify-end p-4 md:p-8 overflow-auto scrollbar-hide">
        {messages.map((message,index) => (
          <div key={index+222} className={`flex ${message?.fromSelf ? 'justify-end' : ''}`}>
            <div className={`bg-${message?.fromSelf ? 'blue' : 'purple'}-400 p-4 rounded-lg max-w-md md:max-w-2xl break-words my-2 md:my-4`}>
              <p className="text-white text-lg">{message?.message}</p>
            </div>
          </div>
        ))}
        <div ref={scrollRef}></div>
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import socket from "../../socket/socket";

const Chat = ({room,username,user,other}) => {
  

  const messagesColumnRef = useRef(null);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  
  const [messageRecieved, setMessageRecieved] = useState([]);

  const joinRoom = () => {
    if (room !== '' && username !== ''){
      socket.emit("join_room", { username, room });
    }
  };
  const sendMessage = () => {
    if (room !== '' && username !== ''){
    if (message !== "") {
      const __createdtime__ = Date.now();
      socket.emit("send_message", { username, room, message, __createdtime__ });
      setMessage("");
    }
  }
  };
  useEffect(() => {
    // Last 100 messages sent in the chat room (fetched from the db in backend)
    socket.on("last_100_messages", (last100Messages) => {
      console.log("Last 100 messages:", JSON.parse(last100Messages));
      last100Messages = JSON.parse(last100Messages);
      // Sort these messages by __createdtime__
      last100Messages = sortMessagesByDate(last100Messages);
      setMessageRecieved((state) => [...last100Messages, ...state]);
    });
    return () => socket.off("last_100_messages");
  }, [socket,username]);
  function sortMessagesByDate(messages) {
    return messages.sort(
      (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
    );
  }
  // useEffect(() => {
  //   messagesColumnRef.current.scrollTop =
  //     messagesColumnRef.current.scrollHeight;
  // }, [messageRecieved]);
  // function formatDateFromTimestamp(timestamp) {
  //   const date = new Date(timestamp);
  //   return date.toLocaleString();
  // }
  const handleShow = () => {
    setShow(!show);
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageRecieved((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });
    return () => socket.off("receive_message");
  }, [socket]);
  return (
    <div className="my-4 w-full md:w-3/5">
      <div
        className={`bg-yellow-400 p-3 rounded-t-xl font-extrabold flex justify-between ${
          show ? "" : "rounded-xl"
        }`}
      >
        <h1>Chat</h1>{" "}
        <label className="swap">
          <input type="checkbox" onClick={handleShow} />
          <div className="swap-on btn btn-circle btn-sm btn-outline font-bold text-xl">
            +
          </div>
          <div className="swap-off btn btn-circle btn-sm btn-outline font-bold text-xl">
            -
          </div>
        </label>
      </div>
      {show && (
  <div className="bg-amber-100 h-5/6 max-h-96 overflow-scroll" ref={messagesColumnRef}>
    {messageRecieved && messageRecieved?.slice(0).reverse().map((mes, i) => {
  return (
    <div key={i} className={`chat ${mes?.sender === user?._id ? 'chat-end':'chat-start'}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={`${mes?.sender !== user?._id}`? user?.image: other?.image} alt="avatar" />
        </div>
      </div>
      <div className="chat-header font-bold">
      {`${mes?.sender===user?._id}`? user?.username:other?.username}
        <time className="text-xs opacity-50">{mes.time}</time>
      </div>
      <div className="chat-bubble">{mes.message}</div>
      {mes?.sender  && <div className="chat-footer opacity-50">Seen at {mes?.time}</div>}
    </div>
  );
})}

  </div>
)}

     {show && <div className="input-group w-full">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message Here…"
          className="input input-bordered w-full"
        />
        <button onClick={sendMessage} className="btn btn-square">
          <svg
            fill="#ffffff"
            height="16px"
            width="16px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 495.003 495.003"
            xmlSpace="preserve"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g id="XMLID_51_">
                {" "}
                <path
                  id="XMLID_53_"
                  d="M164.711,456.687c0,2.966,1.647,5.686,4.266,7.072c2.617,1.385,5.799,1.207,8.245-0.468l55.09-37.616 l-67.6-32.22V456.687z"
                ></path>{" "}
                <path
                  id="XMLID_52_"
                  d="M492.431,32.443c-1.513-1.395-3.466-2.125-5.44-2.125c-1.19,0-2.377,0.264-3.5,0.816L7.905,264.422 c-4.861,2.389-7.937,7.353-7.904,12.783c0.033,5.423,3.161,10.353,8.057,12.689l125.342,59.724l250.62-205.99L164.455,364.414 l156.145,74.4c1.918,0.919,4.012,1.376,6.084,1.376c1.768,0,3.519-0.322,5.186-0.977c3.637-1.438,6.527-4.318,7.97-7.956 L494.436,41.257C495.66,38.188,494.862,34.679,492.431,32.443z"
                ></path>{" "}
              </g>{" "}
            </g>
          </svg>
        </button>
      </div>}
    </div>
  );
};
export default Chat;

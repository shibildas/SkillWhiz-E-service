import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import data from '@emoji-mart/data'
import  Picker  from "@emoji-mart/react";
// import "emoji-mart/css/emoji-mart.css"


import { Button } from 'react-daisyui'

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji) => {
    let message = msg;
    message += emoji.native;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="grid grid-cols-5 items-center bg-gray-900 px-4 md:px-8 py-2">
      <div className="col-span-1">
        <Button
          onClick={handleEmojiPickerhideShow}
          color="primary"
          className="text-2xl"
        >
          <BsEmojiSmileFill />
        </Button>
        {showEmojiPicker && (
          <Picker
          data={data}
          emojiSize={20}
          emojiButtonSize={28}
          maxFrequentRows={0}
          onEmojiSelect={handleEmojiClick} 
          />
        )}
      </div>
      <form className="col-span-4 flex items-center" onSubmit={sendChat}>
        <input
          type="text"
          placeholder="Type your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <button type="submit">
          <IoMdSend className="text-2xl text-white ml-2" />
        </button>
      </form>
    </div>
  );
}

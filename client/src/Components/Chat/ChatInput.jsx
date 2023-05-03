import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import {showAlertError} from "../../Services/showAlert"
import {useDispatch} from 'react-redux'
import EmojiPicker from 'emoji-picker-react';
import { Button } from 'react-daisyui'

export default function ChatInput({ handleSendMsg }) {

  const dispatch=useDispatch()
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji) => {
    console.log(emoji);
    let message = msg;
    message += emoji.emoji;
    setMsg(message);

  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }else{
      showAlertError(dispatch,"No message to sent")
    }
  };

  return (
    <>
      {showEmojiPicker && (
        <EmojiPicker onEmojiClick={handleEmojiClick} height="25em" width="20em" />
      )}
    <div className=" input-group gap-2 w-full items-center bg-gray-900 px-4 md:px-8 py-2">
        <Button
          onClick={handleEmojiPickerhideShow}
          color="primary"
          className="text-2xl btn-sm md:btn-md"
        >
          <BsEmojiSmileFill />
        </Button>
      <form className=" flex items-center input-group " onSubmit={sendChat}>
  
        <input
          type="text"
          placeholder="Type your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="w-full input bg-gray-700 input-sm md:input-md text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
  
        <Button type="submit" className="btn btn-primary btn-sm md:btn-md">
          <IoMdSend className="md:text-4xl  text-white" />
        </Button>
      </form>
    </div>
    </>
  );
}

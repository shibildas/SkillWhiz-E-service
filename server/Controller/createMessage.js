const Message = require('../Model/messageSchema');

async function createMessage(username, room, message, __createdtime__ ) {
  try {
    const newMessage = new Message({
      conversationId:room,
      message:message,
      sender:username,
      __createdtime__:__createdtime__
    });

    const savedMessage = await newMessage.save();
    return JSON.stringify(savedMessage);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = createMessage;

const Message = require('../Model/messageSchema');

async function getMessages(room) {
  try {
    const messages = await Message.find({ conversationId:room }).sort({ createdAt: -1 }).limit(100);
    return JSON.stringify(messages);
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = getMessages;

const msgmodel = require("../Model/msgSchema");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await msgmodel
      .find({
        users: { $all: [from, to] },
      })
      .sort({ updatedAt: 1 });
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        createdAt: new Date(msg.createdAt).toLocaleString(),
      };
    });

    res.json(projectedMessages);
  } catch (error) {
    res.json(error.message);
  }
};
module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message, model } = req.body;
    const data = await msgmodel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
      senderModel: model,
    });
    if (data) {
      return res.json({ msg: "added success" });
    } else {
      return res.json({ msg: "Failed to add message" });
    }
  } catch (error) {
    res.json(error.message);
  }
};

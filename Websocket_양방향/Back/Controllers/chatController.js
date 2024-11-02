const Chat = require("../Models/chat");
const chatController = {};
chatController.saveChat = async (
  message,
  user
) => {
  const newMessage = new Chat({
    user: {
      id: user.id,
      name: user.name,
      token: user.token,
    },
    chat: message,
  });
  await newMessage.save();
  return newMessage;
};
module.exports = chatController;

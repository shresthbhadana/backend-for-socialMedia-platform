const chatRepo = require("../repository/chatRepo") ;


exports.getConversationService = async (user1, user2) => {
  return await messageRepo.getMessagesBetweenUsers(user1, user2);
};

exports.sendMessageService = async (data) => {
  const { senderId, receiverId, message } = data;

  if (!senderId || !receiverId || !message) {
    throw new Error("senderId, receiverId and message are required");
  }
  const newMessage = await messageRepo.createMessage({ senderId, receiverId, message });
  return newMessage;

}
const Message  = require("../models/messageModel")


getMessagesBetweenUsers = async (user1, user2) => {
  return await Message.find({
    $or: [
      { senderId: user1, receiverId: user2 },
      { senderId: user2, receiverId: user1 }
    ]
  }).sort({ createdAt: 1 }); 
};
const createMessage = async (messageData) => {
  return await Message.create(messageData);
};

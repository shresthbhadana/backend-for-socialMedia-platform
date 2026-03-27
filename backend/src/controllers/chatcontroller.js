const messageService = require("../services/chatService");

const sendMessageController = async (req, res) => {
  try {
    const newMessage = await messageService.sendMessageService(req.body);

    return res.status(201).json({
      message: "Message sent successfully",
      data: newMessage
    });

  } catch (error) {
    console.error("sendMessageController error:", error);
    return res.status(400).json({ message: error.message });
  }
};

const getConversationController = async (req, res) => {
  try {
    const { user1, user2 } = req.query;
    if (!user1 || !user2) throw new Error("Both user IDs are required");

    const messages = await messageService.getConversationService(user1, user2);
    return res.status(200).json(messages);

  } catch (error) {
    console.error("getConversationController error:", error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { sendMessageController, getConversationController };
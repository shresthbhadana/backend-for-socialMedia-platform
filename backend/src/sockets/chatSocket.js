const { sendMessageService } = require("../services/chatService");

module.exports =(io)=>{
    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);
    
      socket.on("join", (userId) => {
        socket.join(userId);
      });
    
      socket.on("sendMessage", async (data) => {
      try {
        const newMessage = await sendMessageService(data);

        io.to(data.receiverId).emit("receiveMessage", newMessage);

      } catch (error) {
        console.error(error);
      }
    });
      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });

}
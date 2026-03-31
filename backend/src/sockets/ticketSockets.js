// Reuse the existing io instance from server.js
const ticketService = require("../services/ticketService");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Ticket socket connected:", socket.id);

    socket.on("joinTicket", (ticketId) => {
      socket.join(ticketId);
      console.log(`User joined ticket room: ${ticketId}`);
    });

    socket.on("sendMessage", async ({ ticketId, message }) => {
      try {
        await ticketService.sendMessage(
          ticketId,
          socket.user.role || socket.user.type,
          message
        );

        io.to(ticketId).emit("receiveMessage", {
          message,
          senderType: socket.user.role || socket.user.type
        });

      } catch (err) {
        socket.emit("error", err.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("Ticket socket disconnected:", socket.id);
    });

    socket.on("closeTicket", async (ticketId) => {
      try {
        if ((socket.user.role || socket.user.type) !== "admin") {
          return socket.emit("error", "Only admin can close");
        }

        await ticketService.closeTicket(ticketId);

        io.to(ticketId).emit("ticketClosed", {
          message: "Ticket closed"
        });

      } catch (err) {
        socket.emit("error", err.message);
      }
    });
  });
};
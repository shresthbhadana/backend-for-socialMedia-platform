// Reuse the existing io instance from server.js
module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Notification socket connected:", socket.id);

    socket.on("register", (username) => {
      socket.join(username);
      console.log(`${username} joined room`);
    });

    socket.on("disconnect", () => {
      console.log("Notification socket disconnected:", socket.id);
    });
  });
};
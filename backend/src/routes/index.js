const authRoutes = require("./authRoutes.js");
const userRoutes = require("./userRoutes.js");
const feedRoutes = require("./feedRoutes.js");
const chatRoutes =require("./chatRoutes.js");
const notifiRoutes = require("./notificationRoutes.js")
const postRoutes = require("./postRoutes.js")

const initRoutes = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/feed", feedRoutes);
  app.use("/api/chat", chatRoutes);
  app.use("/api/notification", notifiRoutes);
  app.use("/api/posts", postRoutes);
};

module.exports = initRoutes;
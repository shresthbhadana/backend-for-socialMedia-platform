const authRoutes = require("./authRoutes.js");
const userRoutes = require("./userRoutes.js");
const feedRoutes = require("./feedRoutes.js");
const chatRoutes =require("./chatRoutes.js");
const notifiRoutes = require("./notificationRoutes.js")
const postRoutes = require("./postRoutes.js");
const adminRoutes = require("./adminRoutes.js");
const subAdminRoutes = require("./subAdminRoutes.js");
const policyRoutes = require("./policyRoutes.js");
const termRoutes = require("./termRoutes.js")
const ticketRoutes = require("./ticketRoutes.js")

const initRoutes = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/feed", feedRoutes);
  app.use("/api/chat", chatRoutes);
  app.use("/api/notification", notifiRoutes);
  app.use("/api/posts", postRoutes);
  app.use("/api/admin",adminRoutes);
  app.use("/api/sub-admin", subAdminRoutes);
  app.use("/api/policy", policyRoutes);
  app.use("/api/terms", termRoutes);
  app.use("/api/tickets", ticketRoutes);
};

module.exports = initRoutes;
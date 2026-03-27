const Notification = require("../models/notificationmodel");

const findNotificationById = async (id) => {
  return await Notification.findById(id);
};


const markAsRead = async (notification) => {
  notification.read = true; 
  return await notification.save();
};

module.exports = { findNotificationById, markAsRead };
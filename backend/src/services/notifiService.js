const notificationRepo = require("../repository/notifiRepo");




const getNotification = async (id) => {
  const notification = await notificationRepo.findNotificationById(id);
  if (!notification) throw new Error("Notification not found");
  return notification;
};


const readNotification = async (id) => {
  const notification = await notificationRepo.findNotificationById(id);
  if (!notification) throw new Error("Notification not found");

  const updatedNotification = await notificationRepo.markAsRead(notification);
  return updatedNotification;
};

module.exports = { getNotification, readNotification };
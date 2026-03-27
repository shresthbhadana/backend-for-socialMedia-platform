const notificationService = require("../services/notifiService");

const getNotificationController = async (req, res) => {
  try {
    const notification = await notificationService.getNotification(req.params.id);
    return res.status(200).json({ notification });
  } catch (error) {
    console.error("getNotificationController error:", error);
    return res.status(404).json({ message: error.message });
  }
};

const readNotificationController = async (req, res) => {
  try {
    await notificationService.readNotification(req.params.id);
    return res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    console.error("readNotificationController error:", error);
    return res.status(404).json({ message: error.message });
  }
};

module.exports = { getNotificationController, readNotificationController };
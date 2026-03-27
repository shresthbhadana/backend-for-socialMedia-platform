const authController = require("./authcontroller.js");
const userController = require("./usercontroller.js");
const feedcontroller = require("./feedcontroller.js");
const chatcontroller = require("./chatcontroller.js")
const notificationController = require("./notificontroller.js")

module.exports = {
  ...authController,
  ...userController,
  ...feedcontroller,
  ...chatcontroller,
  ...notificationController
};
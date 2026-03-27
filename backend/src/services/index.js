const authService = require("./auth.service");
const userService = require("./user.service");
const chatService = require("./chatService") ;
const feedService = require("./feedService")
const notifiService = require("./notifiService");

module.exports = {
  ...authService,
  ...userService,
  ...notifiService,
  ...chatService,
  ...feedService
};
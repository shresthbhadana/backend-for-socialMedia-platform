const userRepository = require("./userRepo.js");
const chatRepo = require("./chatRepo.js");
const feedRepo = require("./feedRepo.js");
const notifiRepo = require("./notifiRepo.js");
const postRepo = require("./postRepo.js")

module.exports = {
  ...userRepository,
  ...feedRepo,
  ...chatRepo,
  ...notifiRepo
};
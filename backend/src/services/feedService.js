const feedRepo = require("../repository/feedRepo");
const userRepo = require("../repository/userRepo");

/**
 * Fetch user feed
 * @param {String} userId - from JWT
 * @param {Object} query - limit & skip
 * @returns {Array} posts
 */
const getFeed = async (userId, query) => {
  const limit = query.limit || 10;
  const skip = query.skip || 0;

  // fetch user + following list
  const user = await userRepo.findUserById(userId);
  if (!user) throw new Error("User not found");

  // fetch feed posts from repository
  const posts = await feedRepo.getFeedPosts(user, limit, skip);

  return posts;
};

module.exports = { getFeed };
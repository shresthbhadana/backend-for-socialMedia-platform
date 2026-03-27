const feedService = require("../services/feedService");

exports.getFeedController = async (req, res) => {
  try {
    const userId = req.user.id; 
    const posts =  await feedService.getFeed(userId, req.query);

    return res.status(200).json(posts);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};






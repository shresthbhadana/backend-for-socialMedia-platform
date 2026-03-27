const Post = require("../models/postmodel");


exports.getFeedPosts = async (user, limit = 10, skip = 0) => {
  return await Post.find({
    $or: [
      { user: user._id },                
      { user: { $in: user.following } }   
    ]
  })
    .sort({ createdAt: -1 })
    .limit(Number(limit))
    .skip(Number(skip))
    .populate("user", "name userName"); 
};



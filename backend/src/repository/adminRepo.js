const User = require("../models/usermodel");
const Post = require("../models/postmodel");

exports.getAllUsers = async () => {
    return await User.find();
};




exports.deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};

exports.getAllPosts = async () => {
    return await Post.find().populate("userId");
};

exports.blockUser = async (userId) => {
    return await User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
};

exports.deletePost = async (postId) => {
    return await Post.findByIdAndDelete(postId);
};
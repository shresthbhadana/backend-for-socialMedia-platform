const Post  = require('../models/postmodel.js')
const postService = require("../services/postService.js")

exports.getPostController = async (req, res) => {
  try {
    const post = await postService.getPost(req.params.id);
    return res.status(200).json({ post });
  } catch (error) {
    console.error("getPostController error:", error);
    if (error.message === "Post not found") {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};
 
exports.createPostController = async (req, res) => {
  try {
    const user = req.user || { _id: req.body.userId };
    const postData = req.body;
    const file = req.file;

    const newPost = await postService.createPostService(user, postData);

    return res.status(201).json({
      message: "Post created successfully",
      post: newPost
    });
  } catch (error) {
console.log(error)
    console.error("createPostController error:", error);
    return res.status(400).json({ message: error.message });
  }
};
exports.updatePostController = async (req, res) => {
  try {
    const postId = req.params.id;
    const updateData = req.body;

    const updatedPost = await postService.updatePostService(postId, updateData);

    return res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost
    });

  } catch (error) {
    console.error("updatePostController error:", error);
    if (error.message === "Post not found" || error.message.includes("required")) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.deletePostController = async (req, res) => {
  try {
    const postId = req.params.id;

    await postService.deletePostService(postId);

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("deletePostController error:", error);
    if (error.message === "Post not found") {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.likePostController = async (req, res) => {
  try {
    const postId = req.params.id;

    const updatedPost = await postService.likePostService(postId);

    return res.status(200).json({
      message: "Post liked successfully",
      likes: updatedPost.likes
    });

  } catch (error) {
    console.error("likePostController error:", error);
    if (error.message === "Post not found") {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.addCommentController = async (req, res) => {
  try {
    const postId = req.params.id;
    const commentData = req.body;

    const updatedPost = await postService.addCommentService(postId, commentData);

    return res.status(200).json({
      message: "Comment added successfully",
      comments: updatedPost.comments
    });

  } catch (error) {
    console.error("addCommentController error:", error);
    if (
      error.message === "Post not found" ||
      error.message.includes("required")
    ) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};


exports.deleteCommentController = async (req, res) => {
  try {
    const { id: postId, commentId } = req.params;

    const updatedPost = await deleteCommentService(postId, commentId);

    res.status(200).json({
      message: "Comment deleted successfully",
      comments: updatedPost.comments
    });
  } catch (error) {
    if (error.message === "Post not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getCommentController = async (req, res) => {
  try {
    const { id: postId, commentId } = req.params;

    const comment = await getCommentService(postId, commentId);

    res.status(200).json({
      message: "Comment received successfully",
      comment
    });
  } catch (error) {
    if (error.message === "Post not found" || error.message === "Comment not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};




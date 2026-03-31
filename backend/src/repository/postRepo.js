const Post = require("../models/postmodel");

exports.findPostById = async (id) => {
  return await Post.findById(id).populate("user", "name userName");
};

exports.findAllPosts = async () => {
  return await Post.find().populate("user", "name userName");
};

exports.createPost = async (postData) => {
  return await Post.create(postData);
};

exports.savePost = async (post) => {
  return await post.save();
};

exports.removePost = async (post) => {
  return await post.remove();
};

exports.updatePost = async (postId, updateData) => {
  const post = await exports.findPostById(postId);
  if (!post) throw new Error("Post not found");

  const { body, media } = updateData;

  if (!body && !media) {
    throw new Error("At least one field is required to update");
  }

  if (body) post.body = body;
  if (media) post.media = media;

  return await exports.savePost(post);
};

exports.deletePost = async (postId) => {
  const post = await exports.findPostById(postId);
  if (!post) throw new Error("Post not found");
  await exports.removePost(post);
  return true;
};

exports.likePost = async (postId) => {
  const post = await exports.findPostById(postId);
  if (!post) throw new Error("Post not found");

  post.likes += 1;
  return await exports.savePost(post);
};

exports.commentPost = async (postId, comment) => {
  const post = await exports.findPostById(postId);
  if (!post) throw new Error("Post not found");

  post.comments.push(comment);
  return await exports.savePost(post);
};



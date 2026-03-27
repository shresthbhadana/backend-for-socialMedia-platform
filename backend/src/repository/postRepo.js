const Post = require("../models/postmodel");


exports.findPostById = async (id) => {
  return await Post.findById(id).populate("user", "name userName"); 
};

exports.createPost = async (postData) => {
  return await Post.create(postData);
};

 
exports.updatePostService = async (postId, updateData) => {
  const post = await postRepo.findPostById(postId);
  if (!post) throw new Error("Post not found");

  const { body, media } = updateData;

  if (!body && !media) {
    throw new Error("At least one field is required to update");
  }

  if (body) post.body = body;
  if (media) post.media = media;

  const updatedPost = await postRepo.savePost(post);
  return updatedPost;
};


exports.deletePostService = async (postId) => {
  const post = await postRepo.findPostById(postId);
  if (!post) throw new Error("Post not found");

  await postRepo.removePost(post);
  return true;
};


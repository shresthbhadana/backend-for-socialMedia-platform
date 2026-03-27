const postRepo = require("../repository/postRepo");
const cloudinary = require("cloudinary").v2;

exports.getPost = async (postId) => {
  const post = await postRepo.findPostById(postId);
  if (!post) throw new Error("Post not found");
  return post;
};
 
exports.createPostService = async (user, postData) => {
  const bodyText = postData.body || postData.content;
  if (!bodyText) {
    throw new Error("Post content is required");
  }

  const userId = user?._id || postData.userId;
  if (!userId) {
    throw new Error("userId is required");
  }

  const media = postData.media || "";

  const newPost = await postRepo.createPost({
    userId,
    body: bodyText,
    media,
  });

  return newPost;
};


exports.savePost = async (post) => {
  return await post.save();
};
 
const removePost = async (post) => {
  return await post.remove();
};

const likePostService = async (postId) => {
  const post = await postRepo.findPostById(postId);
  if (!post) throw new Error("Post not found");

  post.likes += 1;
  const updatedPost = await postRepo.savePost(post);
  return updatedPost;
};
exports.addCommentService = async (postId, commentData) => {
  const post = await postRepo.findPostById(postId);
  if (!post) throw new Error("Post not found");

  const { userId, text } = commentData;
  if (!userId || !text) {
    throw new Error("userId and text are required");
  }

  post.comments.push({ userId, text });

  const updatedPost = await postRepo.savePost(post);
  return updatedPost;
};
exports.deleteCommentService = async (postId, commentId) => {
  const post = await postRepo.findPostById(postId);
  if (!post) throw new Error("Post not found");

  
  post.comments = post.comments.filter(
    (comment) => comment._id.toString() !== commentId
  );

  return await postRepo.savePost(post);
};
exports.getCommentService = async (postId, commentId) => {
  const post = await postRepo.findPostById(postId);
  if (!post) throw new Error("Post not found");

  const comment = post.comments.id(commentId);
  if (!comment) throw new Error("Comment not found");

  return comment;
};




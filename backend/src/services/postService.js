const postRepo = require("../repository/postRepo");
const cloudinary = require("cloudinary").v2;
const notificationService = require("./notifiService");

exports.getPost = async (postId) => {
  const post = await postRepo.findPostById(postId);
  if (!post) throw new Error("Post not found");
  return post;
};

exports.getAllPosts = async () => {
  return await postRepo.findAllPosts();
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

exports.updatePostService = async (postId, updateData) => {
  return await postRepo.updatePost(postId, updateData);
};

exports.deletePostService = async (postId) => {
  return await postRepo.deletePost(postId);
};

exports.likePostService = async (postId) => {
  const post = await postRepo.likePost(postId);
  if (!post) throw new Error("Post not found");
  return post;
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

exports.likePost = async (postId, userId, username, io) => {
  const post = await postRepo.findPostById(postId);
  if (!post) throw new Error("Post not found");

  if (post.userId._id.toString() !== userId.toString()) {
    await notificationService.sendNotification({
      receiverUsername: post.userId.username,
      senderUsername: username,
      type: "LIKE",
      message: `${username} liked your post`,
      io,
    });
  }

  await postRepo.likePost(postId);

  return post;
};

exports.commentPost = async (postId, userId, username, text, io) => {
  const post = await postRepo.findPostById(postId);
  if (!post) throw new Error("Post not found");

  if (post.userId._id.toString() !== userId.toString()) {
    await notificationService.sendNotification({
      receiverUsername: post.userId.username,
      senderUsername: username,
      type: "COMMENT",
      message: `${username} commented on your post`,
      io,
    });
  }

  const comment = { userId, text, createdAt: new Date() };
  await postRepo.commentPost(postId, comment);

  return comment;
};

exports.replyToComment = async (postId, commentId, userId, username, text, io) => {
  const post = await postRepo.findPostById(postId);
  if (!post) throw new Error("Post not found");

  const comment = post.comments.id(commentId);
  if (!comment) throw new Error("Comment not found");

  const reply = { userId, username, text };
  if (!comment.replies) comment.replies = [];
  comment.replies.push(reply);
  await postRepo.savePost(post);

  if (comment.userId.toString() !== userId.toString()) {
    await notificationService.sendNotification({
      receiverUsername: comment.username,
      senderUsername: username,
      type: "REPLY",
      message: `${username} replied to your comment`,
      io,
    });
  }

  return post;
};

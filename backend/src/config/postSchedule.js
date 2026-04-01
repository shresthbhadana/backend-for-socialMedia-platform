const cron = require("node-cron");
const Post = require("../model/postModel");
cron.schedule("* * * * *", async () => {
  console.log("Cron running every minute...");

  const posts = await Post.find();
  const now = new Date();

  for (let post of posts) {
    if (post.postedAt < now) {
      await post.save();
    }
  }
});
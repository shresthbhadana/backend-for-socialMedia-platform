const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  body: {
    type: String,
    required: true
  },
  media: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  likes : {
    type : Number,
    default : 0
  },
  
  isActive : {
    type : Boolean,
    default : true
  },
  postedAt : {
    type : Date,
    required : true,
  },
  isPosted : {
    type : Boolean,
    default  : false
  },

  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
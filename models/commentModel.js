import mongoose from "mongoose";

const commentSchema = new mongoose(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      require: true,
      index: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamp: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;

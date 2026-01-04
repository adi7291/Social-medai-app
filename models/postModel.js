import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    captions: String,
    author: [
      {
        type: mongoose.Schema.Types.ObjectId,
        refs: "User",
        required: true,
      },
    ],
    media: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    tags: String,
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);

export default Post;

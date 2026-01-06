import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    captions: {
      type: String,
      maxlength: 2000,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    media: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    // tags: [
    //   {
    //     type:String
    //   }
    // ]
    likes: [
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

// removed comments from the Post schema as each post can have millions of comments and comments can have 1000 of reply and likes.

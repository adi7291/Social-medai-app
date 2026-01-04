import mongoose from "mongoose";

const reelSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    media: {
      type: String,
      required: true,
    },
    caption: String,
    like: [
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

const Reels = mongoose.model("Reel", reelSchema);
export default Reels;

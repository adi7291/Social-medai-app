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

const Reel = mongoose.model("Reel", reelSchema);
export default Reel;

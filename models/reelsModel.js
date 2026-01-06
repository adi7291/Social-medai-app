import mongoose from "mongoose";

const reelSchema = new mongoose.Schema(
  {
    caption: String,

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
    likes: [
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

//removed a comments from the schema.

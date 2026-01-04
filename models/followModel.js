import mongoose from "mongoose";

const followSchema = new mongoose(
  {
    followers: [
      {
        types: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followings: [
      {
        types: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Follow = mongoose.model("Follow", followSchema);

export default Follow;

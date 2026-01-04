import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  author: {
    types: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  media: {
    type: String,
    required: true,
  },
  mediaType: {
    type: String,
    required: true,
    enum: [image, video],
  },
  viewers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expiresAt: 86400,
  },
});

const Story = mongoose.model("Story", storySchema);
export default Story;

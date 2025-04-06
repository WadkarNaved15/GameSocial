import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
  media: [{ type: String }], // Array of image/video URLs
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Post", PostSchema);

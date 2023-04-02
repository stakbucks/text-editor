import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: Date,
});

const Post = mongoose.model("Post", postSchema);

export default Post;

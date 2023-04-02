import express from "express";
import cors from "cors";
import "./db";
import Post from "./Post";

const app = express();

app.use(express.json());

const handleServerOpen = () => console.log("SERVER OPEN 👾");

app.listen(4000, handleServerOpen);

app.use(cors({ origin: "*", credentials: true }));

app.get("/all-posts", async (req, res) => {
  const all = await Post.find({});
  return res.send(all);
});

app.post("/create-post", async (req, res) => {
  const newPost = req.body;
  await Post.create(newPost);

  return res.send("success");
});

app.get(`/post/:id`, async (req, res) => {
  const post = await Post.findById(req.params.id);
  return res.send(post);
});

import express from "express";
import cors from "cors";
import "./db";
import Post from "./Post";
const path = require("path");
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    // 저장할 장소
    destination(req, file, cb) {
      cb(null, "public/uploads");
    },
    // 저장할 이미지의 파일명
    filename(req, file, cb) {
      const ext = path.extname(file.originalname); // 파일의 확장자
      console.log("file.originalname", file.originalname);
      // 파일명이 절대 겹치지 않도록 해줘야한다.
      // 파일이름 + 현재시간밀리초 + 파일확장자명
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  // limits: { fileSize: 5 * 1024 * 1024 } // 파일 크기 제한
});
const app = express();

const handleServerOpen = () => console.log("SERVER OPEN 👾");

app.listen(4000, handleServerOpen);

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // 내부 url 파서 사용
app.use(express.static("public"));

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
  console.log(post);
  return res.send(post);
});

app.delete(`/delete-all`, async (req, res) => {
  await Post.deleteMany({});
  return;
});

app.post("/img", upload.single("img"), (req, res) => {
  // 해당 라우터가 정상적으로 작동하면 public/uploads에 이미지가 업로드된다.
  // 업로드된 이미지의 URL 경로를 프론트엔드로 반환한다.
  console.log("전달받은 파일", req.file);
  console.log("저장된 파일의 이름", req.file.filename);

  // 파일이 저장된 경로를 클라이언트에게 반환해준다.
  const IMG_URL = `http://localhost:4000/uploads/${req.file.filename}`;
  console.log(IMG_URL);
  res.json({ url: IMG_URL });
});

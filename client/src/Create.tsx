import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createPost } from "./api/api";
import { useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [titleValue, setTitleValue] = useState<string>("");
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.currentTarget.value);
  };
  const handleSubmit = async () => {
    const date = new Date();
    if (!titleValue.length) return alert("제목을 입력해주세요!");
    try {
      await createPost({
        title: titleValue,
        content: value,
        date,
      }).then((res) => console.log(res));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ align: [] }],

        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, "link"],
        [
          {
            color: [
              "#000000",
              "#e60000",
              "#ff9900",
              "#ffff00",
              "#008a00",
              "#0066cc",
              "#9933ff",
              "#ffffff",
              "#facccc",
              "#ffebcc",
              "#ffffcc",
              "#cce8cc",
              "#cce0f5",
              "#ebd6ff",
              "#bbbbbb",
              "#f06666",
              "#ffc266",
              "#ffff66",
              "#66b966",
              "#66a3e0",
              "#c285ff",
              "#888888",
              "#a10000",
              "#b26b00",
              "#b2b200",
              "#006100",
              "#0047b2",
              "#6b24b2",
              "#444444",
              "#5c0000",
              "#663d00",
              "#666600",
              "#003700",
              "#002966",
              "#3d1466",
              "custom-color",
            ],
          },
          { background: [] },
        ],
        ["image", "video"],
        ["clean"],
      ],
    },
  };
  //여기에 에디터 넣을 예정
  console.log(value);
  return (
    <>
      <h3>글 작성하기</h3>
      <label htmlFor="title">제목</label>
      <input id="title" type="text" onChange={handleTitleChange} />
      <div>
        <ReactQuill
          style={{ width: "1000px", height: "300px", marginBottom: "100px" }}
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
        />
      </div>
      <button onClick={handleSubmit}>제출</button>
    </>
  );
}
export default Create;

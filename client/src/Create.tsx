import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import Quill from "quill";
import { ImageResize } from "quill-image-resize-module-ts";
import "react-quill/dist/quill.snow.css";
import { createPost } from "./api/api";
import { useNavigate } from "react-router-dom";

Quill.register("modules/imageResize", ImageResize);

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
          handlers: {
            image: imageHandler,
          },
        },
        { background: [] },
      ],
      ["image", "video"],
      ["clean"],
    ],
  },
  imageResize: {},
};

function Create() {
  const quillRef = useRef();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [titleValue, setTitleValue] = useState<string>("");
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.currentTarget.value);
  };
  const handleSubmit = async () => {
    const date = new Date();
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
  const imageHandler = () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    document.body.appendChild(input);
    
    input.click();
  
    input.onchange = async () => {
      const [file] = input.files;
      
      // S3 Presigned URL로 업로드하고 image url 받아오기
      const { preSignedPutUrl: presignedURL, readObjectUrl: imageURL } = (await getS3PresignedURL(file.name)).data;
      await uploadImage(presignedURL, file);
      
      // 현재 커서 위치에 이미지를 삽입하고 커서 위치를 +1 하기
      const range = quillRef.current.getEditorSelection();
      quillRef.current.getEditor().insertEmbed(range.index, 'image', imageURL)
      quillRef.current.getEditor().setSelection(range.index + 1);
      document.body.querySelector(':scope > input').remove()
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
          ref={quillRef}
          style={{ width: "1200px", height: "1300px", marginBottom: "100px" }}
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

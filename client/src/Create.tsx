import { useState } from "react";
import { createPost } from "./api/api";
import { useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftjsToHtml from "draftjs-to-html";

function Create() {
  const navigate = useNavigate();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [htmlString, setHtmlString] = useState("");

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

  const updateTextDescription = (state: any) => {
    setEditorState(state);
    const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
    setHtmlString(html);
  };

  const uploadCallback = () => {
    console.log("이미지 업로드");
  };

  //여기에 에디터 넣을 예정
  console.log(value);
  return (
    <>
      <h3>글 작성하기</h3>
      <label htmlFor="title">제목</label>
      <input id="title" type="text" onChange={handleTitleChange} />
      <div>
        <Editor
          wrapperClassName="wrapper-class"
          toolbarClassName="toolbar-class"
          placeholder="게시글을 작성해주세요"
          editorState={editorState}
          onEditorStateChange={updateTextDescription}
          toolbar={{
            image: { uploadCallback: uploadCallback },
          }}
          localization={{ locale: "ko" }}
          editorStyle={{
            height: "400px",
            width: "100%",
            border: "3px solid lightgray",
            padding: "20px",
          }}
        />
      </div>
      <button onClick={handleSubmit}>제출</button>
    </>
  );
}
export default Create;

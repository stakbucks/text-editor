import { useState } from "react";
import { createPost } from "./api/api";
import { useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";

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

  //여기에 에디터 넣을 예정
  console.log(value);
  return (
    <>
      <h3>글 작성하기</h3>
      <label htmlFor="title">제목</label>
      <input id="title" type="text" onChange={handleTitleChange} />
      <div></div>
      <button onClick={handleSubmit}>제출</button>
    </>
  );
}
export default Create;

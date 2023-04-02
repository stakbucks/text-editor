import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const handleCreateClick = () => navigate("/create-post");
  const handleViewPosts = () => navigate("/");
  return (
    <>
      <h1>TEXT EDITOR APP</h1>
      <button onClick={handleViewPosts}>글 목록</button>
      <button onClick={handleCreateClick}>새 글 작성</button>
      <button>전체 삭제</button>
      <Outlet />
    </>
  );
}

export default App;

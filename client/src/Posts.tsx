import { useEffect, useState } from "react";
import { deleteAllPosts, getAllPosts, IPost } from "./api/api";
import { useNavigate } from "react-router-dom";

function Posts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<IPost[]>([]);

  const handleDeleteAll = async () => {
    await deleteAllPosts();
  };
  const handleSeePost = (id: String | undefined) => {
    navigate(`/post/${id}`);
  };

  useEffect(() => {
    getAllPosts().then((res) => setPosts(res));
  }, [handleDeleteAll]);
  return (
    <>
      <h2>모든 게시물</h2>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <span
              onClick={() => handleSeePost(post._id)}
              style={{ cursor: "pointer" }}
            >
              {post.title}
            </span>
          </li>
        ))}
      </ul>
      <button onClick={handleDeleteAll}>전체 삭제</button>
    </>
  );
}
export default Posts;

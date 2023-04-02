import { useEffect, useState } from "react";
import { getAllPosts, IPost } from "./api/api";
import { useNavigate } from "react-router-dom";

function Posts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    getAllPosts().then((res) => setPosts(res));
  }, []);
  const handleSeePost = (id: String | undefined) => {
    navigate(`/post/${id}`);
  };
  return (
    <>
      <h2>모든 게시물</h2>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <h3
              onClick={() => handleSeePost(post._id)}
              style={{ cursor: "pointer" }}
            >
              {post.title}
            </h3>
          </li>
        ))}
      </ul>
    </>
  );
}
export default Posts;

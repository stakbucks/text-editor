import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPost, IPost } from "./api/api";
import * as DOMPurify from "dompurify";

function Post() {
  const [post, setPost] = useState<IPost>();
  const { id } = useParams();
  useEffect(() => {
    getPost(id + "").then((res) => setPost(res.data));
  }, []);

  return (
    <div>
      <h2>{post?.title}</h2>
      <div
        style={{
          width: "60vw",
          whiteSpace: "normal",
        }}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(String(post?.content)),
        }}
      />
    </div>
  );
}
export default Post;

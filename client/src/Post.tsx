import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPost, IPost } from "./api/api";

function Post() {
  const [post, setPost] = useState<IPost>();
  const { id } = useParams();
  useEffect(() => {
    getPost(id + "").then((res) => setPost(res.data));
  }, []);

  return (
    <>
      <h2>{post?.title}</h2>
      <tr>
        <th></th>
        <td>
          <pre dangerouslySetInnerHTML={{ __html: String(post?.content) }} />
        </td>
      </tr>
    </>
  );
}
export default Post;

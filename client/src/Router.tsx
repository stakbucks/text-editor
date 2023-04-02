import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Create from "./Create";
import Post from "./Post";
import Posts from "./Posts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Posts />,
      },
      {
        path: "create-post",
        element: <Create />,
      },
      {
        path: "post/:id",
        element: <Post />,
      },
    ],
  },
]);
export default router;

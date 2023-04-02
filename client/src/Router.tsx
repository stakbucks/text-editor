import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Create from "./Create";
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
    ],
  },
]);
export default router;

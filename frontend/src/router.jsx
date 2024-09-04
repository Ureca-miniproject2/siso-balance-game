import { createBrowserRouter } from "react-router-dom";
import GlobalLayout from "./layout/GlobalLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    children: [{ index: true, element: <div></div> }],
  },
]);

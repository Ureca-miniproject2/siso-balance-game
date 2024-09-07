import { createBrowserRouter } from "react-router-dom";
import GlobalLayout from "./layout/GlobalLayout";
import MainPage from "./pages/MainPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    children: [{ index: true, element: <MainPage /> }],
  },
]);

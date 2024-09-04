import { Outlet } from "react-router-dom";

export default function GlobalLayout() {
  return (
    <div>
      <Outlet />
      <div>sss</div>
    </div>
  );
}

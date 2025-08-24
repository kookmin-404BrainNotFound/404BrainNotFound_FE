import { Outlet } from "react-router-dom";
import BackHeader from "../components/PageHeader"; // 있으면 사용, 없으면 간단한 헤더로 대체

export default function MypageLayout() {
  return (
    <div className="px- pb-4 text-6">
      <Outlet />
    </div>
  );
}

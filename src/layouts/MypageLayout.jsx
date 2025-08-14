import { Outlet } from "react-router-dom";
import BackHeader from "../components/BackHeader"; // 있으면 사용, 없으면 간단한 헤더로 대체

export default function MypageLayout() {
  return (
    <div className="min-h-[calc(100vh-56px)]">
      <BackHeader title="마이페이지" />
      <Outlet />
    </div>
  );
}

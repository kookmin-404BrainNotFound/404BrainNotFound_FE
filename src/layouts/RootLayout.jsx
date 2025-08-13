import { Outlet } from "react-router-dom";
import BottomNav from "../components/BottomNav";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-white">
      {/* 중앙 프레임(모바일 폭) */}
      <div className="mx-auto max-w-md min-h-screen relative">
        {/* 본문 */}
        <main className="px-5 py-4 pb-28">
          <Outlet />
        </main>

        {/* 하단 네비 */}
        <BottomNav />
      </div>
    </div>
  );
}

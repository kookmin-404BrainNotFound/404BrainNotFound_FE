import { Outlet } from "react-router-dom";
import BottomNav from "../components/BottomNav";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white">
      {/* 중앙 프레임(모바일 폭) */}
      <div className="mx-auto max-w-md min-h-screen relative">
        {/* 상단 헤더 */}
        <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b">
          <div className="px-5 py-4 flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900">안전한 집 찾기</h1>
            <div className="text-sm text-gray-500">Beta</div>
          </div>
        </header>

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

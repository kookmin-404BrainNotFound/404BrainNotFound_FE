import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import Header from "../components/Header";

export default function RootLayout() {
  const { pathname } = useLocation();

  // 예외 처리할 경로들 (헤더/네비바 숨기기)
  const hiddenHeaderRoutes = [
    "/explore/doc/intro",
    "/explore/doc/method",
    "/explore/doc/upload",
  ];
  const hiddenNavRoutes = [
    "/explore/doc/intro",
    "/explore/doc/method",
    "/explore/doc/upload",
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto relative w-full min-h-screen sm:w-[375px] overflow-y-auto shadow-2xl">
        
        {/* ✅ 헤더 (예외 페이지는 숨김) */}
        {!hiddenHeaderRoutes.includes(pathname) && (
          <Header title="매물 분석" />
        )}

        <main className="px-0 py-0 pb-[56px]">
          <Outlet />
        </main>

        {/* ✅ 네비바 (예외 페이지는 숨김) */}
        {!hiddenNavRoutes.includes(pathname) && <BottomNav />}
      </div>
    </div>
  );
}

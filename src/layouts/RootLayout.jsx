import { Outlet } from "react-router-dom";
import BottomNav from "../components/BottomNav";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto relative w-full min-h-screen sm:w-[375px] overflow-y-auto shadow-2xl">
        <main className="px-0 py-0 pb-[56px]">
          <Outlet />
        </main>

        <BottomNav />
      </div>
    </div>
  );
}

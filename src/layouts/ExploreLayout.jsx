// src/layouts/ExploreLayout.jsx
import { Outlet } from "react-router-dom";

export default function ExploreLayout() {
  return (
    <div className="flex flex-col">
      {/* Header 제거: RootLayout에서만 렌더 */}
      <div className="px-5 flex-1">
        <Outlet />
      </div>
    </div>
  );
}

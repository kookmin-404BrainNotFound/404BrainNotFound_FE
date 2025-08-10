import { NavLink, Outlet } from "react-router-dom";

export default function ExploreLayout() {
  return (
    <div className="space-y-5">
      {/* 섹션 타이틀 + 검색 */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-gray-900">탐색</h2>
        <div className="flex items-center gap-2">
          <input
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            placeholder="동/역세권/예산으로 찾아보기…"
          />
          <button className="shrink-0 rounded-xl border px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
            🔍
          </button>
        </div>
      </div>

      {/* 섹션 내부 탭 */}
      <div className="bg-white/80 border rounded-2xl p-2 flex gap-2">
        <Tab to="/explore" end>추천</Tab>
        <Tab to="/explore/test">나의 성향 테스트</Tab>
      </div>

      <Outlet />
    </div>
  );
}

function Tab({ to, end, children }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `px-3.5 py-2 rounded-xl text-sm transition ${
          isActive
            ? "bg-indigo-600 text-white shadow-sm"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

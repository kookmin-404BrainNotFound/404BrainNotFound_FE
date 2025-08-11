import { NavLink } from "react-router-dom";

const tabs = [
  { to: "/home", label: "홈", icon: "🔎" },
  { to: "/explore",    label: "매물분석", icon: "⚠️" },
  { to: "/contract",label: "계약 도우미", icon: "📄" },
  { to: "/life",    label: "마이", icon: "👤​" },
];

export default function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-4 mb-3 rounded-2xl border bg-white/80 backdrop-blur shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        <ul className="grid grid-cols-4">
          {tabs.map((t) => (
            <li key={t.to}>
              <NavLink
                to={t.to}
                end
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center gap-1 py-2.5 text-xs transition ${
                    isActive
                      ? "text-indigo-700"
                      : "text-gray-500 hover:text-gray-700"
                  }`
                }
              >
                <span className="text-lg">{t.icon}</span>
                <span className="leading-none">{t.label}</span>
                {/* 활성 인디케이터 */}
                <span
                  className="h-1 w-6 rounded-full mt-1"
                  style={{
                    background:
                      "currentColor",
                    opacity: 0.2,
                  }}
                />
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

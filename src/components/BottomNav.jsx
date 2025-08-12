import { NavLink } from "react-router-dom";

const tabs = [
  { to: "/home", label: "홈", image: "/icons/home.png" },
  { to: "/explore", label: "매물분석", image: "/icons/home.png" }, // ← 파일 추가 필요!
  { to: "/contract", label: "계약 도우미", image: "/icons/helper.png" },
  { to: "/my", label: "마이", image: "/icons/my.png" },
];

export default function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t bg-white/80 backdrop-blur
             supports-[backdrop-filter]:bg-white/70
             shadow-[0_-2px_10px_rgba(0,0,0,0.06)] mx-auto max-w-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto max-w-md grid grid-cols-4">
        {tabs.map((t) => (
          <li key={t.to}>
            <NavLink
              to={t.to}
              end
              className={({ isActive }) =>
                [
                  "flex flex-col items-center justify-center gap-1 py-2.5 text-xs transition",
                  isActive ? "text-black" : "text-gray-400 hover:text-gray-700",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  <img
                    src={t.image}
                    alt={t.label}
                    draggable="false"
                    className={[
                      "w-6 h-6 object-contain transition",
                      isActive
                        ? "grayscale-0 opacity-100"
                        : "grayscale opacity-40",
                    ].join(" ")}
                  />
                  <span className="leading-none">{t.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

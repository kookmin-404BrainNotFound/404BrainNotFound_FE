import { NavLink } from "react-router-dom";

const tabs = [
  { to: "/explore", label: "탐색", icon: "🔎" },
  { to: "/explore/test", label: "테스트", icon: "🧪" },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t py-2 flex justify-around">
      {tabs.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          end
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? "text-purple-600 font-semibold" : "text-gray-500"
            }`
          }
        >
          <span className="text-xl">{t.icon}</span>
          <span>{t.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

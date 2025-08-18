import { NavLink, useLocation } from "react-router-dom";
import HomeIcon from "../assets/home.svg?react";
import SearchIcon from "../assets/search.svg?react";
import HelperIcon from "../assets/helper.svg?react";
import MyIcon from "../assets/my.svg?react";

const tabs = [
  { to: "/home", label: "홈", Icon: HomeIcon, key: "home" },
  { to: "/explore", label: "매물분석", Icon: SearchIcon, key: "explore" },
  { to: "/contract", label: "계약 도우미", Icon: HelperIcon, key: "contract" },
  { to: "/my", label: "마이", Icon: MyIcon, key: "my" },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  const isActiveByKey = (key) => {
    if (key === "my") return pathname.startsWith("/my");
    if (key === "explore") return pathname.startsWith("/explore");
    if (key === "contract") return pathname.startsWith("/contract");
    if (key === "home") return pathname === "/" || pathname.startsWith("/home");
    return false;
  };

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30  bg-white
                  mx-auto w-full sm:w-[375px] h-[84px] "
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto max-w-md grid grid-cols-4">
        {tabs.map(({ to, label, key, Icon }) => {
          const active = isActiveByKey(key);
          const base =
            "flex flex-col items-center justify-center gap-1 py-2.5 text-xs transition";
          const textCls = active
            ? "text-green-200"
            : "text-gray-400 hover:text-gray-500";
          const iconCls = active ? "text-green-200" : "";

          return (
            <li key={to}>
              <NavLink to={to} className={`${base} ${textCls}`}>
                <Icon className={`w-6 h-6 transition ${iconCls}`} />
                <span className="leading-none">{label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

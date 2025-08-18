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
      className="fixed inset-x-0 bottom-0 z-30 border-t bg-white backdrop-blur
                 supports-[backdrop-filter]:bg-white/70
                 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] mx-auto w-full sm:w-[375px] "
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

// 원래 png였을 때 코드
// const tabs = [
//   { to: "/home", label: "홈", image: "/icons/home.png", key: "home" },
//   {
//     to: "/explore",
//     label: "매물분석",
//     image: "/icons/search.png",
//     key: "explore",
//   },
//   {
//     to: "/contract",
//     label: "계약 도우미",
//     image: "/icons/helper.png",
//     key: "contract",
//   },
//   { to: "/my", label: "마이", image: "/icons/my.png", key: "my" },
// ];

// export default function BottomNav() {
//   const { pathname } = useLocation();

//   // 하위 경로까지 활성 처리 규칙
//   const isActiveByKey = (key) => {
//     if (key === "my") return pathname.startsWith("/my");
//     if (key === "explore") return pathname.startsWith("/explore");
//     if (key === "contract") return pathname.startsWith("/contract");
//     if (key === "home") return pathname === "/" || pathname.startsWith("/home");
//     return false;
//   };

//   return (
//     // 네비 바 UI
//     <nav
//       className="fixed inset-x-0 bottom-0 z-30 border-t bg-green backdrop-blur
//                  supports-[backdrop-filter]:bg-white/70
//                  shadow-[0_-2px_10px_rgba(0,0,0,0.06)] mx-auto w-full sm:w-[375px]"
//       style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
//     >
//       {/* // 탭 렌더링 */}
//       <ul className="mx-auto max-w-md grid grid-cols-4">
//         {tabs.map((t) => {
//           const active = isActiveByKey(t.key);
//           const base =
//             "flex flex-col items-center justify-center gap-1 py-2.5 text-xs transition";
//           const textCls = active
//             ? "text-black"
//             : "text-gray-400 hover:text-gray-700";
//           const imgCls = active ? " opacity-100" : "";

//           return (
//             <li key={t.to}>
//               <NavLink to={t.to} className={`${base} ${textCls}`}>
//                 <img
//                   src={t.image}
//                   alt={t.label}
//                   draggable="false"
//                   className={`w-6 h-6 object-contain transition ${imgCls}`}
//                 />
//                 <span className="leading-none">{t.label}</span>
//               </NavLink>
//             </li>
//           );
//         })}
//       </ul>
//     </nav>
//   );
// }

import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import Header from "../components/Header";

export default function RootLayout() {
  const { pathname } = useLocation();

  //헤더 숨김
  const hiddenHeaderExact = [
    "/explore/doc/intro",
    "/explore/doc/method",
    "/explore/doc/upload",
    "/home/style/complete",
    "/contract/scan",
    "/contract/analyze",
    "/contract/legal",    
    "/contract/cleaning",
    "/home",
    "/home/checklist",
    "/home/style/intro",
  ];

  //헤더 숨김 하위페이지까지
  const hiddenHeaderPrefixes = [
    "/my",
    "/home/tips/", // tips 하위 전부
  ];

  //네비바 숨김
  const hiddenNavExact = [
    "/explore/doc/intro",
    "/explore/doc/method",
    "/explore/doc/upload",
    "/my/legal",
    "/my/cleaning",
    "/explore/doc/analyze",
    "/contract/scan",
    "/contract/analyze",
  ];

  //네비바 숨김 하위페이지까지
  const hiddenNavPrefixes = ["/home/style/"];

  const isHidden = (exactArr, prefixArr) =>
    exactArr.includes(pathname) ||
    prefixArr.some((p) => pathname.startsWith(p));

  const hideHeader = isHidden(hiddenHeaderExact, hiddenHeaderPrefixes);
  const hideNav = isHidden(hiddenNavExact, hiddenNavPrefixes);

  const TITLE_RULES = [
    {
      test: (p) => p.startsWith("/explore/doc/"),
    },
    { test: (p) => p.startsWith("/explore"), title: "매물 분석" },

    {
      test: (p) => p.startsWith("/contract"),
      title: "계약 도우미",
    },

    { test: (p) => p.startsWith("/my/tips"), title: "팁 보러가기(임시)" },
    { test: (p) => p.startsWith("/my/reports"), title: "리포트 모아보기" },
    { test: (p) => p.startsWith("/my/settings"), title: "설정" },
    {
      test: (p) => p.startsWith("/my/cleaning"),
      title: "이사/청소 서비스//제외",
    },
    { test: (p) => p.startsWith("/my/legal"), title: "법률 연계//제외" },
    { test: (p) => p.startsWith("/my"), title: "마이페이지" },

    {
      test: (p) => p === "/" || p.startsWith("/home/style"),
      title: "주거 성향 입력",
    },
  ];

  const getHeaderTitle = (p) => {
    const rule = TITLE_RULES.find((r) => r.test(p));
    return rule ? rule.title : "안전한 집 구하기";
  };

  const headerTitle = getHeaderTitle(pathname);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto relative w-full min-h-screen sm:w-[375px] overflow-y-auto shadow-2xl">
        {!hideHeader && <Header title={headerTitle} />}

        <main className="px-0 py-0 pb-[56-px]">
          <Outlet />
        </main>

        {!hideNav && <BottomNav />}
      </div>
    </div>
  );
}

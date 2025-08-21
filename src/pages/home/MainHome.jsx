import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const tips = [
  { icon: "📄", text: "등기부등본이란?" },
  { icon: "💡", text: "1인 가구가 알아야 할 사항들" },
  { icon: "🔍", text: "전세, 월세, 반전세는 무엇이 다를까?" },
  { icon: "📖", text: "전세 사기 사례 모음" },
  { icon: "🏠", text: "이런 부동산은 피하자" },
];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="flex items-center justify-between px-4 py-3 shadow-sm bg-white">
        <div className="flex items-center gap-2">
          <img src="/icons/lghouse.png" alt="든든집 로고" className="w-6 h-6" />
          <img src="/icons/mainlogo.png" alt="든든집 로고" className="w-16 h-6" />
        </div>
        <button aria-label="채팅">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-6 h-6 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 1.657-1.79 3-4 3h-1l-3 3v-3H7c-2.21 0-4-1.343-4-3V6c0-1.657 1.79-3 4-3h10c2.21 0 4 1.343 4 3v6z"
            />
          </svg>
        </button>
      </header>

      {/* 메인 이미지 & 문구 */}
      <div className="relative">
        <img
          src="/house-sample.jpg"
          alt="집 이미지"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black/25 flex items-center px-4">
          <p className="text-white font-semibold text-lg leading-6">
            1인 가구도 <br />
            안전하게 집 구하자 <br />
            든든한 도우미,{" "}
            <span className="text-green-300">든든집</span>
          </p>
        </div>
      </div>

      {/* 주요 메뉴 */}
      <div className="px-4 py-5 space-y-3">
        <button
          onClick={() => navigate("/home/style")}
          className="w-full flex items-center gap-3 bg-white rounded-xl shadow-[0px_0px_10px_0.2px] shadow-gray-100 p-4"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-500 text-xl">
            ☀️
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-900 ">주거 성향 입력</h3>
            <p className="text-sm text-gray-500">
              나랑 매물의 궁합은 몇 점?
            </p>
          </div>
        </button>

        <button
          onClick={() => navigate("/checklist")}
          className="w-full flex items-center gap-3 bg-white rounded-xl shadow-[0px_0px_10px_0.2px] shadow-gray-100 p-4"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-xl">
            📋
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-900">계약 체크리스트</h3>
            <p className="text-sm text-gray-500">
              혼자서도 계약이 두렵지 않아!
            </p>
          </div>
        </button>
      </div>

      <div className="w-11/12 max-w-md mx-auto bg-white rounded-xl shadow-[0px_0px_10px_0.2px] shadow-gray-100 p-4 flex flex-col">
        <h2 className="font-semibold text-gray-800 mb-2">팀 게시판</h2>
        <ul className="divide-y">
          {tips.map((tip, index) => (
            <li
              key={index}
              className="flex items-center gap-2 py-3 text-sm text-gray-700"
            >
              <span className="text-lg">{tip.icon}</span>
              <span>{tip.text}</span>
            </li>
          ))}
        </ul>
      </div>






      {/* 팀 게시판 */}
      {/* <div className="px-4 py-4">
        <h2 className="font-semibold text-gray-800 mb-2">팀 게시판</h2>
        <div className="bg-white rounded-xl shadow-sm divide-y">
          <button className="w-full text-left px-4 py-3 text-sm text-gray-700">
            📄 등기부등본이란?
          </button>
          <button className="w-full text-left px-4 py-3 text-sm text-gray-700">
            💡 1인 가구가 알아야 할 사항들
          </button>
          <button className="w-full text-left px-4 py-3 text-sm text-gray-700">
            🔍 전세, 월세, 반전세는 무엇이 다를까?
          </button>
          <button className="w-full text-left px-4 py-3 text-sm text-gray-700">
            📖 사기 사례 모음</button>
          <button className="w-full text-left px-4 py-3 text-sm text-gray-700">
            🏠 부동산은 피하자</button>
        </div>
      </div> */}
    </div>  

  );
}

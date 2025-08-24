import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const tips = [
    { icon: "📄", text: "등기부등본이란?", slug: "meaning-of-deung-gi" },
    {
      icon: "💡",
      text: "1인 가구가 알아야 할 사항들",
      slug: "single-cautions",
    },
    {
      icon: "🔍",
      text: "전세, 월세, 반전세는 무엇이 다를까?",
      slug: "contract-difference",
    },
    { icon: "📖", text: "전세 사기 사례 모음", slug: "fake-contract-cases" },
    { icon: "🏠", text: "이런 부동산은 피하자", slug: "contract-checklist" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="flex items-center justify-between px-4 py-3 shadow-sm bg-white">
        <div className="flex items-center gap-2">
          <img src="/icons/lghouse.png" alt="든든집 로고" className="w-6 h-6" />
          <img
            src="/icons/mainlogo.png"
            alt="든든집 로고"
            className="w-16 h-6"
          />
        </div>
        <button
          onClick={() => navigate("/chat")}
          aria-label="채팅"
          className="p-1"
        >
          <img
            src="/icons/chat.png"
            alt="채팅"
            className="w-6 h-6 object-contain"
          />
        </button>
      </header>

      {/* 메인 이미지 & 문구 */}
      <div className="relative">
        <img
          src="/images/docmethod/dndnmain.png"
          alt="집 이미지"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black/25 flex items-center px-4">
          <img
            src="/images/docmethod/maintext.png"
            alt="든든집 메인 문구"
            className="w-44 h-auto mt-32" // 173 84  / 43 21
          />
        </div>
      </div>

      <div className="px-4 py-5 space-y-3">
        <button
          onClick={() => navigate("/home/style")}
          className="w-full flex items-center justify-between bg-white rounded-xl shadow-[0px_0px_10px_2px_rgba(0,0,0,0.03)] p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img
                src="/icons/sunlight.png"
                alt="햇빛 이미지"
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">주거 성향 입력</h3>
              <p className="text-sm text-gray-500">나랑 매물의 궁합은 몇 점?</p>
            </div>
          </div>

          <img
            src="/icons/arrowright.png"
            alt="arrow right"
            className="w-3.5 h-7 object-contain"
          />
        </button>

        <button
          onClick={() => navigate("/home/checklist")}
          className="w-full flex items-center justify-between bg-white rounded-xl shadow-[0px_0px_10px_2px_rgba(0,0,0,0.03)] p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img
                src="/icons/checklist.png"
                alt="체크리스트 아이콘"
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">계약 체크리스트</h3>
              <p className="text-sm text-gray-500">
                혼자서도 계약이 두렵지 않아!
              </p>
            </div>
          </div>

          <img
            src="/icons/arrowright.png"
            alt="arrow right"
            className="w-3.5 h-7 object-contain"
          />
        </button>
      </div>

      <h2 className="font-semibold text-xl text-gray-800 mb-2 mt-3 px-5">
        팁 게시판
      </h2>

      <div className="w-11/12 max-w-md mx-auto bg-white rounded-xl shadow-[0px_0px_10px_2px_rgba(0,0,0,0.03)] px-5 py-2 flex flex-col">
        <ul className="divide-y">
          {tips.map((tip, index) => (
            <li
              key={index}
              onClick={() => navigate(`/home/tips/${tip.slug}`)} // 클릭 시 상세 이동
              className="flex items-center gap-2 py-1.5 text-base text-gray-700 cursor-pointer hover:bg-gray-50"
            >
              <span className="text-lg">{tip.icon}</span>
              <span>{tip.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-16"></div>
    </div>
  );
}

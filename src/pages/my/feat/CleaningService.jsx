"use client";
import { useNavigate } from "react-router-dom";

const vendors = [
  {
    id: "sky",
    name: "하늘클리닝",
    field: "맞춤 입주청소",
    tag: "입주/이사 청소",
    image: "/icons/clean_sky.png", // 없으면 이모지 대체 가능
    emoji: "☁️",
    bg: "bg-blue-50",
    fg: "text-blue-500",
  },
  {
    id: "royal",
    name: "로얄이사",
    field: "안전한 포장이사",
    tag: "포장이사",
    image: "/icons/clean_royal.png",
    emoji: "🚚",
    bg: "bg-amber-50",
    fg: "text-amber-600",
  },
  {
    id: "leader",
    name: "청소캠리더",
    field: "이사/입주 청소",
    tag: "후기 좋은 업체",
    image: "/icons/clean_leader.png",
    emoji: "⭐",
    bg: "bg-slate-600",
    fg: "text-white",
  },
];

export default function CleaningService() {
  const nav = useNavigate();

  const handleContact = (id) => {
    alert(`${id} 업체에 상담(견적)을 요청했어요!`);
  };

  return (
    <div className="bg-white min-h-screen max-w-md mx-auto">
      {/* 뒤로가기 */}
      <div className="px-4 py-2">
        <button
          className="p-2 rounded-full hover:bg-gray-100"
          onClick={() => nav(-1)}
          aria-label="뒤로가기"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* 타이틀 */}
      <div className="px-1 pb-4">
        <p className="text-sm text-teal-600 mb-2">계약이 완료되었나요?</p>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">이사/청소까지 도와줄게요</h2>
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          우리 서비스와 제휴한 이사/청소 전문가에게 무료로 견적을 받을 수 있어요.
        </p>

        {/* ▼▼ lawyer 스타일: 가로 스크롤 카드 리스트 ▼▼ */}
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        <div className="-mx-4 px-4 overflow-x-auto hide-scrollbar">
          <div className="flex gap-3">
            {vendors.map((v) => (
              <div
                key={v.id}
                className="bg-white border border-gray-200 rounded-2xl p-4 text-center shadow-sm flex-shrink-0 w-40"
              >
                {/* 이미지가 있으면 img, 없으면 이모지 원형 배지 */}
                {v.image ? (
                  <img
                    src={v.image}
                    alt={v.name}
                    className="w-14 h-14 mx-auto mb-3 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className={`w-14 h-14 mx-auto mb-3 rounded-full ${v.bg} flex items-center justify-center`}
                  >
                    <span className={`text-xl ${v.fg}`}>{v.emoji}</span>
                  </div>
                )}

                <h3 className="font-semibold text-sm text-gray-900 mb-1">{v.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{v.field}</p>

                <span className="inline-block text-[10px] px-2 py-1 rounded-full bg-teal-50 text-teal-700 mb-3">
                  {v.tag}
                </span>

                <button
                  onClick={() => handleContact(v.id)}
                  className="w-full text-xs bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  무료 견적
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 후기/안내 */}
        <div className="space-y-4 my-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              입주 청소 무료 견적을 받아 봤는데, 따로 구하는 것보다 훨씬 저렴해서 좋았어요. 👍
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              소형 포장이사를 구하기 쉽지 않았는데, 여기서 제휴 연결까지 해 주니까 편해요. 😊
            </p>
          </div>
          <p className="text-xs text-gray-500 px-1">
            이후 이용자 정보가 중요하여 계약 및 동의 후 미리 견적 받고 예약해요.
          </p>
        </div>
      </div>

      {/* 하단 CTA */}
      <div className="px-4 pb-4 space-y-3">
        <button
          className="w-full bg-teal-600 text-white py-4 rounded-xl font-medium text-base hover:bg-teal-700 transition-colors"
          onClick={() => alert("전체 업체에 견적을 요청했어요!")}
        >
          무료로 견적 받기
        </button>
        <button
          className="w-full bg-gray-100 text-gray-600 py-4 rounded-xl font-medium text-base hover:bg-gray-200 transition-colors"
          onClick={() => alert("괜찮아요")}
        >
          괜찮아요
        </button>
      </div>
    </div>
  );
}

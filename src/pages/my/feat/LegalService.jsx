import { useState } from "react";
import Button from "../../../components/Button"; // 경로 확인

const lawyers = [
  { id: "kim",  name: "김하나 변호사", field: "주택 임대차",  image: "/images/lawyers/lawyer1.png", tag: "즉시 연락" },
  { id: "yoon", name: "윤영석 변호사", field: "전세사기",    image: "/images/lawyers/lawyer2.png", tag: "전화 상담" },
  { id: "oh",   name: "오한준 변호사", field: "임대차보호법", image: "/images/lawyers/lawyer3.png", tag: "임대차보호법" },
  { id: "lee",  name: "이선영 변호사", field: "주택 임대차",  image: "/images/lawyers/lawyer4.png", tag: "즉시 연락" },
];

const reviews = [
  "계약서 위험 요소 때문에 상담했는데, 저렴한 가격에 퀄리티가 높았어요! 👍",
  "혼자 계약 진행하다 불안했는데, 신뢰할 수 있는 전문가라서 좋았어요.",
  "실시간으로 조언해 주셔서 큰 도움 받았습니다. 😊",
];

export default function LegalService() {
  const [reviewIndex, setReviewIndex] = useState(0);
  const nextReview = () => setReviewIndex((i) => (i + 1) % reviews.length);

  const handleContact = (id) => {
    alert(`${id} 변호사에게 상담 요청했어요!`);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6">
      <p className="text-xs text-emerald-600 mb-1">위험 요소가 발견되었나요?</p>
      <h2 className="text-xl font-bold text-gray-900 mb-2">법률 전문가와 상담할 수 있어요</h2>
      <p className="text-gray-600 text-sm mb-5">
        우리 서비스와 제휴한 신뢰할 수 있는 법률 전문가가 대기 중이에요. 안전하고 정확한 계약 상담을 도와드릴게요.
      </p>

      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x">
        {lawyers.map((l) => (
          <div key={l.id} className="flex-shrink-0 w-52 p-4 border rounded-2xl shadow-sm bg-white snap-start">
            <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
              <img src={l.image || "/icons/my.png"} alt={l.name} className="w-16 h-16 object-cover" />
            </div>
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">{l.field}</p>
              <h3 className="font-bold">{l.name}</h3>
              <div className="mt-2">
                <span className="text-[11px] px-2 py-1 rounded-full border text-gray-600">{l.tag}</span>
              </div>
              <Button
                className="bg-green-100 text-[11px] text-greem-300 hover:bg-green-300 mobile-button w-12 h-8 flex items-center justify-center mx-auto"
                onClick={() => handleContact(l.id)}
              >
                상담 요청
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 후기 슬라이드 */}
      <div className="mt-4 space-y-3">
        <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-800">💬 {reviews[reviewIndex]}</p>
          <button onClick={nextReview} className="text-xs text-blue-600 mt-2 underline">다음 후기 보기</button>
        </div>
      </div>

      {/* CTA 버튼 */}
      <div className="mt-8 space-y-3">
        <Button className="w-full text-base mobile-button">상담 바로가기</Button>
        <Button className="w-full text-base bg-gray-200 text-gray-700 hover:bg-gray-300">괜찮아요</Button>
      </div>
    </div>
  );
}

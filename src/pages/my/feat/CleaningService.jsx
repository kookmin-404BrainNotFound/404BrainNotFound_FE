import { useState } from "react";
import Button from "../../../components/Button";

const vendors = [
  { id: "sky", name: "하늘클리닝", type: "청소", image: "/images/cleaning/sky.png", tag: "맞춤 입주청소" },
  { id: "logen", name: "로젠이사", type: "이사", image: "/images/cleaning/logen.png", tag: "안전한 포장이사" },
  { id: "clean-gallery", name: "청소갤러리", type: "청소", image: "/images/cleaning/gallery.png", tag: "이사/입주 청소" },
  { id: "moving-one", name: "움직임 익스", type: "이사", image: "/images/cleaning/movingone.png", tag: "소형 포장이사" },
  { id: "aircare", name: "에어케어", type: "청소", image: "/images/cleaning/aircare.png", tag: "에어컨 분해 세척" },
];

const reviews = [
  "입주 청소 무료 견적을 받아 봤는데, 따로 구하는 것보다 훨씬 저렴해서 좋았어요. 👍",
  "소형 포장이사를 구하기 쉽지 않았는데, 여기서 제휴 연결까지 해 주니까 편해요. 😊",
  "에어컨 청소가 중요해서 계약과 동시에 미리 견적받고 예약했어요!",
];

export default function CleaningService() {
  const [reviewIndex, setReviewIndex] = useState(0);
  const nextReview = () => setReviewIndex((i) => (i + 1) % reviews.length);

  const handleQuote = (id) => {
    alert(`${id} 업체에 견적을 요청했어요!`);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6">
      <p className="text-xs text-emerald-600 mb-1">계약이 완료되었나요?</p>
      <h2 className="text-xl font-bold text-gray-900 mb-2">이사/청소까지 도와줄게요</h2>
      <p className="text-gray-600 text-sm mb-5">우리 서비스와 제휴한 이사/청소 전문가에게 무료로 견적 받을 수 있어요.</p>

      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x">
        {vendors.map((v) => (
          <div key={v.id} className="flex-shrink-0 w-52 p-4 border rounded-2xl shadow-sm bg-white snap-start">
            <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
              <img src={v.image || "/icons/home.png"} alt={v.name} className="w-16 h-16 object-cover" />
            </div>
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">{v.type}</p>
              <h3 className="font-bold">{v.name}</h3>
              <div className="mt-2">
                <span className="text-[11px] px-2 py-1 rounded-full border text-gray-600">{v.tag}</span>
              </div>
              <Button
                className="bg-green-100 text-[11px] text-green-300 hover:bg-green-200 mobile-button w-12 h-8 flex items-center justify-center mx-auto"
                onClick={() => handleQuote(v.id)}
              >
                견적 요청
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
        <Button className="w-full text-base mobile-button">무료로 견적 받기</Button>
        <Button className="w-full text-base bg-gray-200 text-gray-700 hover:bg-gray-300">괜찮아요</Button>
      </div>
    </div>
  );
}

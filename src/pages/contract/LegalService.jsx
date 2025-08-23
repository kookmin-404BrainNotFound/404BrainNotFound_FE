import { useState } from "react"
import { useNavigate } from "react-router-dom"
import PageHeader from "../../components/PageHeader";

const lawyers = [
  {
    id: "kim",
    name: "김하나 변호사",
    field: "법무법인 사자",
    image: "/icons/lawyer_kim.png",
    tag: "주택 임대차",
  },
  {
    id: "yoon",
    name: "윤영석 변호사",
    field: "법무법인 지은",
    image: "/icons/lawyer_yoon.png",
    tag: "전세사기",
  },
  {
    id: "oh",
    name: "오현준 변호사",
    field: "법무법인 사공",
    image: "/icons/lawyer_oh.png",
    tag: "임대차보호법",
  },
    {
    id: "lee",
    name: "이선영 변호사",
    field: "법무법인 사자",
    image: "/icons/lawyer_lee.png",
    tag: "주택 임대차",
  },
    {
    id: "bae",
    name: "배태호 변호사",
    field: "법무법인 사자",
    image: "/icons/lawyer_bae.png",
    tag: "주택 임대차",
  },
]

const reviews = [
  "계약서 위험 요소 때문에 상담했는데, 저렴한 가격에 퀄리티가 높았어요! 👍",
  "혼자 계약 진행하다 불안했는데, 신뢰할 수 있는 전문가라서 좋았어요 😊",
]

export default function LegalService() {
  const [reviewIndex, setReviewIndex] = useState(0)
  const nav = useNavigate()

  const handleContact = (id) => {
    alert(`${id} 변호사에게 상담 요청했어요!`)
  }

  const nextReview = () => setReviewIndex((i) => (i + 1) % reviews.length)
  const prevReview = () => setReviewIndex((i) => (i - 1 + reviews.length) % reviews.length)

  return (
    <div className="bg-gray-100 min-h-screen">
    <PageHeader title="ㅤ" />
      <div className="mx-auto max-w-md min-h-screen flex flex-col bg-white">

        {/* Content */}
        <div className="flex-1 px-4">
          <p className="text-sm text-green-200 mb-1">위험 요소가 발견되었나요?</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">법률 전문가와 상담할 수 있어요</h2>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            우리 서비스와 제휴한 신뢰할 수 있는 법률 전문가가 대기 중이에요. 안전하고 정확한 계약 상담을 도와드릴게요.
          </p>

          {/* 전문가 가로 스크롤 리스트 (스크롤바 숨김 옵션 포함) */}
          <div
            className="flex overflow-x-auto gap-3 mb-6 pb-2 [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{ scrollbarWidth: "none" }}
          >
            {/* 웹킷 스크롤 숨김 */}
            <style>{`
              .hide-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>
            <div className="hide-scrollbar flex gap-3 ">
              {lawyers.map((lawyer) => (
                <div
                  key={lawyer.id}
                  className="bg-white border border-green-200 rounded-2xl p-4 text-center shadow-md flex-shrink-0 w-28 h-40"
                >
                  <img
                    src={lawyer.image}
                    alt={lawyer.name}
                    className="mt-4 w-14 h-14 mx-auto mb-3 rounded-full object-cover"
                  />
                  <p className="text-xs text-gray-500">{lawyer.field}</p>
                  <h3 className="font-semibold text-sm text-gray-900 mb-1">{lawyer.name}</h3>

                  <div className="inline-block text-[10px] px-2 rounded-full bg-teal-50 text-teal-700 mb-3">
                    {lawyer.tag}
                  </div>
                  <br/>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                입주 청소 무료 견적을 받아 봤는데, 따로 구하는 것보다 훨씬 저렴해서 좋았어요. 👍
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                김수 소형 포장이사를 구하기 쉽지 않았는데, 여기서 제휴 연결까지 해 주니까 편해요. 😊
              </p>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="px-4 pb-4 space-y-2">
          <button
            className="w-full bg-teal-600 text-white py-4 rounded-lg font-medium text-base hover:bg-teal-700 transition-colors"
            onClick={() => alert("상담 바로가기")}
          >
            상담 바로가기
          </button>
          <button
            className="w-full bg-gray-100 text-gray-600 py-4 rounded-lg font-medium text-base hover:bg-gray-200 transition-colors"
            onClick={() => alert("괜찮아요")}
          >
            괜찮아요
          </button>
        </div>
      </div>
    </div>
  )
}

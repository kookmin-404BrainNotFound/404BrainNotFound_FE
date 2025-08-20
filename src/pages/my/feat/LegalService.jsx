"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const lawyers = [
  {
    id: "kim",
    name: "김하나 변호사",
    field: "주택 임대차",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qtZrz4dzDiPPaSDfkmxWLH0JVv8lJt.png",
    tag: "즉시 연락",
  },
  {
    id: "yoon",
    name: "윤영석 변호사",
    field: "전세사기",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qtZrz4dzDiPPaSDfkmxWLH0JVv8lJt.png",
    tag: "전화 상담",
  },
  {
    id: "oh",
    name: "오한준 변호사",
    field: "임대차보호법",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qtZrz4dzDiPPaSDfkmxWLH0JVv8lJt.png",
    tag: "임대차보호법",
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
    <div className="-mx-5 bg-gray-100 min-h-screen">
      <div className="mx-auto max-w-md min-h-screen flex flex-col bg-white">
        {/* Back Button */}
        <div className="px-4 py-2">
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={() => nav(-1)}
            aria-label="뒤로가기"
            title="뒤로가기"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-4">
          <p className="text-sm text-teal-600 mb-2">위험 요소가 발견되었나요?</p>
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
            <div className="hide-scrollbar flex gap-3">
              {lawyers.map((lawyer) => (
                <div
                  key={lawyer.id}
                  className="bg-white border border-gray-200 rounded-2xl p-4 text-center shadow-sm flex-shrink-0 w-40"
                >
                  <img
                    src={lawyer.image}
                    alt={lawyer.name}
                    className="w-14 h-14 mx-auto mb-3 rounded-full object-cover"
                  />
                  <h3 className="font-semibold text-sm text-gray-900 mb-1">{lawyer.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{lawyer.field}</p>
                  <span className="inline-block text-[10px] px-2 py-1 rounded-full bg-teal-50 text-teal-700 mb-3">
                    {lawyer.tag}
                  </span>
                  <button
                    onClick={() => handleContact(lawyer.id)}
                    className="w-full text-xs bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    상담 요청
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 후기 */}
          <div className="space-y-3 mb-6">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-700">{reviews[reviewIndex]}</p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={prevReview}
                className="px-3 py-1 text-xs rounded border border-gray-200 hover:bg-gray-100"
              >
                이전
              </button>
              <button
                onClick={nextReview}
                className="px-3 py-1 text-xs rounded border border-gray-200 hover:bg-gray-100"
              >
                다음
              </button>
            </div>
            <p className="text-xs text-gray-500 px-2">실제로 도움 받은 고객들의 후기입니다. 전문가가 도움을 드릴게요.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="p-4 space-y-3">
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

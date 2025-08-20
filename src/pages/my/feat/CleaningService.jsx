"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const vendors = [
  {
    id: "sky",
    name: "하늘클리닝",
    type: "청룡 입주청소",
    icon: "🌤️",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    id: "royal",
    name: "로얄이사",
    type: "안전한 포장이사",
    icon: "📦",
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    id: "leader",
    name: "청소캠리더",
    type: "이사/입주 청소",
    icon: "🚀",
    bgColor: "bg-slate-600",
    iconColor: "text-white",
  },
]

const reviews = [
  "입주 청소 무료 견적을 받아 봤는데, 따로 구하는 것보다 훨씬 저렴해서 좋았어요. 👍",
  "소형 포장이사를 구하기 쉽지 않았는데, 여기서 제휴 연결까지 해 주니까 편해요. 😊",
]

export default function CleaningService() {
  const [reviewIndex, setReviewIndex] = useState(0)
  const nav = useNavigate()

  const handleQuote = (id) => {
    alert(`${id === "all" ? "전체" : id} 업체에 견적을 요청했어요!`)
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
        <div className="flex-1 px-4 py-2">
          <p className="text-sm text-teal-600 mb-2">계약이 완료되었나요?</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">이사/청소까지 도와줄게요</h2>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            우리 서비스와 제휴한 이사/청소 전문가에게 무료로 견적을 받아 보세요.
          </p>

          {/* 제휴 업체 가로 스크롤 (스크롤바 숨김) */}
          <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}`}</style>
          <div className="hide-scrollbar flex overflow-x-auto gap-3 mb-6 pb-2 [-ms-overflow-style:none] [scrollbar-width:none]">
            {vendors.map((v) => (
              <div
                key={v.id}
                className="bg-white border border-gray-200 rounded-2xl p-4 text-center shadow-sm flex-shrink-0 w-40"
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${v.bgColor} flex items-center justify-center`}>
                  <span className={`text-xl ${v.iconColor}`}>{v.icon}</span>
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">{v.name}</h3>
                <p className="text-xs text-gray-500 mb-3">{v.type}</p>
                <button
                  onClick={() => handleQuote(v.id)}
                  className="w-full text-xs bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  이 업체에 견적 요청
                </button>
              </div>
            ))}
          </div>

          {/* 후기 */}
          <div className="space-y-3 mb-8">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-700">{reviews[reviewIndex]}</p>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={prevReview} className="px-3 py-1 text-xs rounded border border-gray-200 hover:bg-gray-100">
                이전
              </button>
              <button onClick={nextReview} className="px-3 py-1 text-xs rounded border border-gray-200 hover:bg-gray-100">
                다음
              </button>
            </div>
            <p className="text-xs text-gray-500 px-1">실제 이용자 후기예요. 전문가가 빠르게 연결됩니다.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="p-4 space-y-3">
          <button
            className="w-full bg-teal-600 text-white py-4 rounded-xl font-medium text-base hover:bg-teal-700 transition-colors"
            onClick={() => handleQuote("all")}
          >
            무료로 전체 견적 받기
          </button>
          <button
            className="w-full bg-gray-100 text-gray-600 py-4 rounded-xl font-medium text-base hover:bg-gray-200 transition-colors"
            onClick={() => alert("괜찮아요")}
          >
            괜찮아요
          </button>
        </div>
      </div>
    </div>
  )
}

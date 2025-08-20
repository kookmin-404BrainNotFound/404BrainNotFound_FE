"use client"

import { useState } from "react"

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
  "김수 소형 포장이사를 구하기 쉽지 않았는데, 여기서 제휴 연결까지 해 주니까 편해요.",
]

export default function CleaningService() {
  const [reviewIndex, setReviewIndex] = useState(0)

  const handleQuote = (id) => {
    alert(`${id} 업체에 견적을 요청했어요!`)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <button className="p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="text-sm font-medium">9:41</div>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          </div>
          <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          <div className="w-6 h-3 border border-black rounded-sm">
            <div className="w-4 h-2 bg-black rounded-sm m-0.5"></div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <p className="text-sm text-teal-600 mb-2">계약이 완료되었나요?</p>
        <h2 className="text-xl font-bold text-gray-900 mb-2">이사/정소까지 도와줄게요</h2>
        <p className="text-gray-600 text-sm mb-8">
          우리 서비스와 제휴한 이사/청소 전문가에게 무료로 견적 받을 수 있어요.
        </p>

        <div className="flex overflow-x-auto gap-3 mb-6 pb-2">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-white border border-gray-200 rounded-2xl p-4 text-center shadow-sm flex-shrink-0 w-24"
            >
              <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${vendor.bgColor} flex items-center justify-center`}>
                <span className={`text-xl ${vendor.iconColor}`}>{vendor.icon}</span>
              </div>
              <h3 className="font-semibold text-sm text-gray-900 mb-1">{vendor.name}</h3>
              <p className="text-xs text-gray-500">{vendor.type}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4 mb-8">
          <p className="text-sm text-gray-700">
            입주 청소 무료 견적을 받아 봤는데, 따로 구하는 것보다 훨씬 저렴해서 좋았어요. 👍
          </p>

          <div className="bg-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              김수 소형 포장이사를 구하기 쉽지 않았는데, 여기서 제휴 연결까지 해 주니까 편해요.
            </p>
          </div>

          <p className="text-xs text-gray-500">이번엔 에어컨 청소까지 계약과 동시에 동시에 미리</p>
        </div>

        <div className="space-y-3">
          <button
            className="w-full bg-teal-600 text-white py-4 rounded-xl font-medium text-base hover:bg-teal-700 transition-colors"
            onClick={() => handleQuote("all")}
          >
            무료로 견적 받기
          </button>
          <button className="w-full bg-gray-100 text-gray-600 py-4 rounded-xl font-medium text-base hover:bg-gray-200 transition-colors">
            괜찮아요
          </button>
        </div>
      </div>
    </div>
  )
}

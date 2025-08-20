"use client"

import { useState } from "react"

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
  "계약서 위험 계약서의 위험 요소 때문에 상담했는데, 저렴한 가격에 퀄리티가 높았어요! 👍",
  "혼자 계약 진행하다 불안했는데, 신뢰할 수 있는 전문가라서 좋았어요 😊",
]

export default function LegalService() {
  const [reviewIndex, setReviewIndex] = useState(0)

  const handleContact = (id) => {
    alert(`${id} 변호사에게 상담 요청했어요!`)
  }

  return (
    <div className="-mx-5 bg-gray-100 min-h-screen">
      <div className="mx-auto max-w-md min-h-screen flex flex-col bg-white">
        {/* Mobile Status Bar */}
        <div className="flex justify-between items-center px-4 py-2 bg-white">
          <span className="text-sm font-medium">9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              <div className="w-1 h-3 bg-black rounded-full"></div>
              <div className="w-1 h-3 bg-black rounded-full"></div>
              <div className="w-1 h-3 bg-black rounded-full"></div>
              <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
            </div>
            <div className="ml-1">
              <svg className="w-4 h-3" viewBox="0 0 24 18" fill="none">
                <path
                  d="M2 4C2 2.89543 2.89543 2 4 2H20C21.1046 2 22 2.89543 22 4V14C22 15.1046 21.1046 16 20 16H4C2.89543 16 2 15.1046 2 14V4Z"
                  fill="black"
                />
                <path d="M23 6V12C23.5523 12 24 11.5523 24 11V7C24 6.44772 23.5523 6 23 6Z" fill="black" />
              </svg>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="px-4 py-2">
          <button className="p-2">
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

          <div className="flex overflow-x-auto gap-3 mb-6 pb-2">
            {lawyers.map((lawyer) => (
              <div
                key={lawyer.id}
                className="bg-white border border-gray-200 rounded-2xl p-4 text-center shadow-sm flex-shrink-0 w-24 cursor-pointer"
                onClick={() => handleContact(lawyer.id)}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={lawyer.image || "/placeholder.svg"}
                    alt={lawyer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">{lawyer.name}</h3>
                <p className="text-xs text-gray-500">{lawyer.field}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3 mb-6">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-700">{reviews[reviewIndex]}</p>
            </div>

            <p className="text-xs text-gray-500 px-2">
              실제로 도움 받은 고객들의 후기입니다. 전문가가 도움을 드릴게요.
            </p>
          </div>
        </div>

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

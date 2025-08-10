
export default function ExploreHome() {
  const cards = [
    { title: "전세사기 위험 낮은 동네", desc: "공공데이터 기반 리스크 필터", emoji: "🛡️" },
    { title: "예산 맞춤 매물", desc: "월세·관리비 포함 총합 기준", emoji: "💸" },
    { title: "소음/치안 지도", desc: "안전지도+민원 데이터를 한눈에", emoji: "🗺️" },
    { title: "출퇴근 최적화", desc: "통근시간·환승 횟수 최소화", emoji: "⏱️" },
  ];

  return (
    <div className="space-y-5">
      {/* 요약 배너 */}
      <div className="rounded-2xl border bg-gradient-to-br from-indigo-50 to-white p-4">
        <p className="text-sm text-gray-600">맞춤 추천을 시작해보세요</p>
        <h3 className="mt-1 text-lg font-semibold text-gray-900">
          내 성향 기반 안전 매물 추천
        </h3>
        <button className="mt-3 rounded-xl bg-indigo-600 px-4 py-2 text-white text-sm hover:bg-indigo-700">
          테스트 하러 가기
        </button>
      </div>

      {/* 기능 카드 */}
      <div className="grid grid-cols-2 gap-3">
        {cards.map((c) => (
          <div
            key={c.title}
            className="rounded-2xl border bg-white p-4 hover:shadow-md transition"
          >
            <div className="text-2xl">{c.emoji}</div>
            <div className="mt-2 text-sm font-semibold text-gray-900 line-clamp-2">
              {c.title}
            </div>
            <div className="mt-1 text-xs text-gray-500 line-clamp-2">{c.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

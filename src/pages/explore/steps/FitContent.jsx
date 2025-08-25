import React from "react";

// 아이콘을 동적으로 선택하기 위한 헬퍼 객체
const checkIcons = {
  0: "/icons/no.png", // 위험
  1: "/icons/soso.png", // 보통
  2: "/icons/greencheck.png", // 안전
};

const getCheckLabel = (check) => {
  switch (check) {
    case 0:
      return "부적합";
    case 1:
      return "보통";
    case 2:
      return "적합";
  }
};

const getCheckColor = (check) => {
  switch (check) {
    case 1:
      return "bg-[#FFBB2A]"; // 주황색
    case 2:
      return "bg-[#2A83FF]"; // 파란색
    default:
      return "bg-red-500"; // 빨간색
  }
};

// ✅ 강조 및 줄바꿈 처리 함수
function formatTextWithHighlight(text) {
  if (!text) return "정보 없음";

  // 줄바꿈(\n)은 <br/>로 치환, **텍스트**는 초록색 span으로 치환
  const parts = text.split(/(\*\*.*?\*\*|\n)/g);

  return parts.map((part, idx) => {
    if (part === "\n") {
      return <br key={idx} />;
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      const clean = part.slice(2, -2);
      return (
        <span key={idx} className="text-green-200 font-semibold">
          {clean}
        </span>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}

export default function FitContent({ data }) {
  // 데이터가 없으면 렌더링하지 않음
  if (!data) return null;

  // data prop에서 필요한 데이터를 직접 구조 분해 할당
  const { summary, preferences, air, flood, building, otherItems } = data;

  return (
    <section className="space-y-3 pt-1">
      {/* 빠르게 보는 종합 결론 */}
      {summary && (
        <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl p-4">
          <h3 className="font-semibold text-lg mb-3">빠르게 보는 종합 결론</h3>
          <p className="bg-[#EAF2F1] text-green-300 text-base font-bold px-3 py-4 rounded-lg mb-3 leading-relaxed">
            {summary.conclusion}
          </p>
          {summary.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <img src={checkIcons[item.check]} className="w-auto h-3 mt-1" />
              <p className="text-sm mb-2 text-gray-700">
                {formatTextWithHighlight(item.label)}
              </p>
            </li>
          ))}
        </div>
      )}

      {/* 사용자 성향 분석 */}
      {preferences && (
        <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl p-5">
          <div className="flex items-center mb-4">
            <h3 className="font-semibold mb-3">사용자 성향 분석</h3>
            <span
              className={`mx-2 mb-3 px-2 py-1 text-xs font-bold text-white rounded-md ${getCheckColor(
                building.check
              )}`}
            >
              {getCheckLabel(building.check)}
            </span>
          </div>

          <img
            src="/icons/alltypeicons.png"
            alt="가로 5개 아이콘"
            className="mt-5 mx-2 w-[278.4px] h-12 mb-6"
          />
          <ul className="space-y-3">
            {building.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <img
                  src={checkIcons[item.check]}
                  alt="체크"
                  className="w-auto h-3 mt-1"
                />
                <p className="text-sm text-gray-700">
                  {formatTextWithHighlight(item.label)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 건축물 및 위치 특성 */}
      {preferences && (
        <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl p-5">
          <div className=" mb-4">
            <div className="flex items-center mb-4">
              <h3 className="font-semibold mb-2">건축물 및 위치 특성</h3>
              <span
                className={`mx-2 mb-2 px-2 py-1 text-xs font-bold text-white rounded-md ${getCheckColor(
                  building.check
                )}`}
              >
                {getCheckLabel(building.check)}
              </span>
            </div>
            <div className="flex items-start gap-4 mb-4 mt-6">
              <img
                src="/icons/building.png"
                alt="건축물 아이콘"
                className="w-16 h-16 "
              />
              <div className="flex flex-col text-sm text-gray-700 space-y-1">
                <p>
                  <b>주 용도:</b> {building.facts.usage}
                </p>
                <p>
                  <b>준공년도:</b> {building.facts.year}년
                </p>
                <p>
                  <b>특성:</b> {(building.facts.features ?? []).join(", ")}
                </p>
              </div>
            </div>
          </div>
          <ul className="space-y-3">
            {building.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <img
                  src={checkIcons[item.check]}
                  alt="체크"
                  className="w-auto h-3 mt-1"
                />
                <p className="text-sm text-gray-700">
                  {formatTextWithHighlight(item.label)}
                </p>
              </li>
            ))}
          </ul>

          <div className="bg-[#F6FAF9] rounded-lg p-4 text-sm mt-3 text-gray-500 leading-relaxed flex items-start gap-2">
            <span className="text-lg ">💡</span>
            <div className="text-gray-500 text-sm leading-relaxed">
              <p>
                오피스텔은 주거용이지만 업무시설로 분류되어 일부 세금이나 관리
                규정에서 차이가 있을 수 있어요.
              </p>
              <p className="mt-3">
                입주 전 관리사무소에서{" "}
                <b>실제 거주자 비율, 관리비 내역, 입주민 특성</b>을 문의해
                보시는 게 좋아요.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 공기질 */}
      {air && (
        <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl p-5">
          <h3 className="font-bold text-lg mb-4">공기질</h3>
          <ul className="space-y-3 mb-4">
            {air.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <img
                  src={checkIcons[item.check]}
                  alt="체크"
                  className="w-auto h-3 mt-1"
                />
                <p className="text-sm text-gray-700">
                  {formatTextWithHighlight(item.label)}
                </p>
              </li>
            ))}
          </ul>
          {air.facts?.air_summary && (
            <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
              💡 {air.facts.air_summary}
            </div>
          )}
        </div>
      )}

      {/* 침수 위험 분석 */}
      {flood && (
        <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl p-5">
          <h3 className="font-bold text-lg mb-4">침수 위험</h3>
          <ul className="space-y-3 mb-4">
            {flood.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <img
                  src={checkIcons[item.check] || "/icons/warning.png"}
                  alt="체크"
                  className="w-auto h-3 mt-1"
                />
                <p className="text-sm text-gray-700">
                  {formatTextWithHighlight(item.label)}
                </p>
              </li>
            ))}
          </ul>
          {flood.facts?.note && (
            <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
              💡 {flood.facts.note}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

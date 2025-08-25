import React from "react";

// 아이콘을 동적으로 선택하기 위한 헬퍼 객체
const checkIcons = {
  0: "/icons/no.png", // 위험
  1: "/icons/soso.png", // 보통
  2: "/icons/greencheck.png", // 안전
};
// check 숫자에 따라 태그 텍스트를 반환하는 함수
const getCheckLabel = (check) => {
  switch (check) {
    case 1:
      return "확인필요";
    case 2:
      return "안전";
    default:
      return "위험";
  }
};

// check 숫자에 따라 태그 색상을 반환하는 함수
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

export default function RiskContent({ data }) {
  // 데이터가 없으면 렌더링하지 않음
  if (!data) return null;

  // data prop에서 필요한 데이터를 직접 구조 분해 할당
  const {
    summary,
    deposit,
    building,
    ownership,
    mortgage,
    otherright,
    finalevaluation,
  } = data;

  const getHeight = (value) => {
    return `${Math.max(40, Math.sqrt(value))}px`;
  };
  return (
    <section className="space-y-3 pt-1">
      {summary && (
        <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl p-4">
          <h3 className="font-semibold text-lg mb-3">빠르게 보는 종합 결론</h3>
          <p className="bg-[#EAF2F1] text-green-300 text-base font-bold px-3 py-4 rounded-lg mb-3 leading-relaxed">
            {summary.conclusion}
          </p>
          {summary.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <img src={checkIcons[item.check]} className="w-auto h-3 mt-1" />{" "}
              <p className="text-sm mb-2 text-gray-700">{item.label}</p>{" "}
            </li>
          ))}
        </div>
      )}

      {/* 보증금 및 시세 분석 */}
      {deposit && (
        <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl p-5">
          <div className="flex items-center mb-4">
            <h3 className="font-semibold mb-3">보증금 및 시세 분석</h3>
            <span
              className={`mx-2 mb-3 px-2 py-1 text-xs font-bold text-white rounded-md ${getCheckColor(
                deposit.check
              )}`}
            >
              {getCheckLabel(deposit.check)}
            </span>
          </div>
          <div className="flex justify-between items-end mb-5 ">
            {/* 사용자 보증금 */}
            <div className="text-center flex-1">
              <div
                className="bg-green-200 text-white px-1 rounded-lg font-bold w-24 mx-auto flex items-center justify-center"
                style={{ height: getHeight(deposit.facts.userDeposit.value) }}
              >
                {deposit.facts.userDeposit.value.toLocaleString()}
                {deposit.facts.userDeposit.unit}
              </div>
              <p className="text-xs font-bold text-green-200 mt-1">
                사용자 보증금
              </p>
            </div>

            <div className="w-0" />

            {/* 단지 평균 보증금 */}
            <div className="text-center flex-1">
              <div
                className="bg-gray-200 text-gray-700  rounded-lg font-bold w-24 mx-auto flex items-center justify-center"
                style={{ height: getHeight(deposit.facts.complexAvg.value) }}
              >
                {deposit.facts.complexAvg.value.toLocaleString()}
                {deposit.facts.complexAvg.unit}
              </div>
              <p className="text-xs font-bold text-gray-500 mt-1">
                단지 평균 보증금
              </p>
            </div>
          </div>

          {/* <div className="flex justify-between items-center mb-5">
            <div className="text-center flex-1">
              <div className="bg-green-200 text-white px-4 py-2 rounded-lg font-bold min-w-[80px] mx-auto">
                {deposit.facts.userDeposit.value.toLocaleString()}
                {deposit.facts.userDeposit.unit}
              </div>
              <p className="text-xs font-bold text-green-200 mt-1">
                사용자 보증금
              </p>
            </div>
            <div className="w-4" />
            <div className="text-center flex-1">
              <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold min-w-[80px] mx-auto">
                {deposit.facts.complexAvg.value.toLocaleString()}
                {deposit.facts.complexAvg.unit}
              </div>
              <p className="text-xs font-bold text-gray-500 mt-1">
                단지 평균 보증금
              </p>
            </div>
          </div> */}

          <ul className="space-y-3">
            {deposit.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <img
                  src={checkIcons[item.check]}
                  alt="체크"
                  className="w-auto h-3 mt-1"
                />
                <p className="text-sm text-gray-700">{item.label}</p>
              </li>
            ))}
          </ul>

          <div className="bg-[#F6FAF9] rounded-lg p-4 text-sm mt-3 text-gray-500 leading-relaxed flex items-start gap-2">
            <span className="text-lg ">💡</span>
            <div className="text-gray-500 text-sm leading-relaxed">
              <p>
                최근 전세 사기 유형에서 평균 대비 10~20% 이상 높은 보증금이
                반복적으로 등장하는 경우 주의가 필요해요.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 건축물대장 분석 */}
      {building && (
        <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl p-5">
          <div className="flex items-center mb-4">
            <h3 className="font-semibold mb-3">건축물대장 분석</h3>
            <span
              className={`mx-2 mb-3 px-2 py-1 text-xs font-bold text-white rounded-md ${getCheckColor(
                building.check
              )}`}
            >
              {getCheckLabel(building.check)}
            </span>
          </div>
          <div className="flex items-start gap-4 mb-4">
            <img
              src="/icons/building.png"
              alt="건축물 아이콘"
              className="w-16 h-16"
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
          <ul className="space-y-3">
            {building.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <img
                  src={checkIcons[item.check] || "/icons/warning.png"}
                  alt="체크"
                  className="w-auto h-5 mt-1"
                />
                <p className="text-sm text-gray-700">{item.label}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 등기부등본 상세 분석 */}
      <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl p-5 space-y-6">
        <h3 className="font-bold text-lg mb-2">등기부등본 상세 분석</h3>
        {ownership && (
          <div>
            <div className="flex items-center mb-2">
              <h4 className="font-semibold">소유권</h4>
              <span
                className={`ml-2 px-2 py-1 text-xs font-bold text-white rounded-md ${getCheckColor(
                  ownership.check
                )}`}
              >
                {getCheckLabel(ownership.check)}
              </span>
            </div>
            <ul className="text-sm text-gray-700 space-y-2">
              {ownership.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <img
                    src={checkIcons[item.check] || "/icons/warning.png"}
                    alt="체크"
                    className="w-auto h-3 mt-1"
                  />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <hr className="my-4 border-gray-200" />
        {mortgage && (
          <div>
            <div className="flex items-center mb-2">
              <h4 className="font-semibold">근저당/담보</h4>
              <span
                className={`ml-2 px-2 py-1 text-xs font-bold text-white rounded-md ${getCheckColor(
                  mortgage.check
                )}`}
              >
                {getCheckLabel(mortgage.check)}
              </span>
            </div>
            <ul className="text-sm text-gray-700 space-y-2">
              {mortgage.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <img
                    src={checkIcons[item.check] || "/icons/warning.png"}
                    alt="체크"
                    className="w-auto h-3 mt-1"
                  />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <hr className="my-4 border-gray-200" />
        {otherright && (
          <div>
            <div className="flex items-center mb-2">
              <h4 className="font-semibold">기타 권리사항</h4>
              <span
                className={`ml-2 px-2 py-1 text-xs font-bold text-white rounded-md ${getCheckColor(
                  otherright.check
                )}`}
              >
                {getCheckLabel(otherright.check)}
              </span>
            </div>
            <ul className="text-sm text-gray-700 space-y-2">
              {otherright.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <img
                    src={checkIcons[item.check] || "/icons/warning.png"}
                    alt="체크"
                    className="w-auto h-3 mt-1"
                  />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 위험요소 종합 평가 */}
      {finalevaluation && (
        <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl p-5">
          <div className="flex items-center mb-4">
            <h3 className="font-semibold">위험요소 종합 평가</h3>
            <span
              className={`ml-2 px-2 py-1 text-xs font-bold text-white rounded-md ${getCheckColor(
                finalevaluation.check
              )}`}
            >
              {getCheckLabel(finalevaluation.check)}
            </span>
          </div>

          <div className="flex flex-col items-center text-center my-6">
            <p className="text-green-800 font-semibold text-base mb-4">
              {finalevaluation.conclusion}
            </p>
            <img
              src="/icons/housecheck.png"
              alt="집 체크 아이콘"
              className="w-28 h-28"
            />
          </div>

          <ul className="text-sm text-gray-700 space-y-2 mb-5">
            {finalevaluation.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <img
                  src={checkIcons[item.check]}
                  alt="체크"
                  className="w-auto h-3 mt-1"
                />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>

          <div className="bg-[#F6FAF9] rounded-lg p-4 text-sm mt-3 text-gray-500 leading-relaxed flex items-start gap-2">
            <span className="text-lg ">💡</span>
            <div className="text-gray-500 text-sm leading-relaxed">
              <p>
                신축 오피스텔 특성상 다수 임차인이 유사 조건으로 입주하기 때문에
                보증금 반환에 있어 집단 리스크가 발생할 수 있지만, 소유주가
                다수로 분산되어 있다면 위험이 낮아요.
              </p>
              <p className="mt-3">
                본 건은
                <b>개인 소유 단일 호실</b>이기 때문에 해당 리스크도
                제한적이에요.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

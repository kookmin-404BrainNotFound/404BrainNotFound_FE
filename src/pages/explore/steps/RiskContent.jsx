// RiskContent.jsx;
// // src/components/RiskContent.jsx
// import React from "react";

// export default function RiskContent({ data }) {
//   if (!data || !data.description) return null;

//   const {
//     summary,
//     deposit,
//     building,
//     ownership,
//     mortgage,
//     otherright,
//     finalevaluation,
//   } = data.description;

//   return (
//     <section className="space-y-3 pt-1">
//       {/* 빠르게 보는 종합 결론 */}
//       <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl p-4">
//         <h3 className="font-semibold mb-3">{summary.title}</h3>
//         <div className="bg-[#EAF2F1] text-green-200 text-center font-bold px-3 py-2 rounded-lg mb-3">
//           {finalevaluation.conclusion}
//         </div>
//         {summary.items.map((item, idx) => (
//           <p key={idx} className="mt-1 text-sm text-gray-600">
//             {item.label}
//           </p>
//         ))}
//       </div>

//       {/* 보증금 및 시세 분석 */}
//       <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl p-5">
//         <div className="flex items-center mb-4">
//           <h3 className="font-semibold mb-3">보증금 및 시세 분석</h3>
//           <span className="mx-2 mb-3 px-2 py-1 text-xs font-bold text-white bg-[#2A83FF] rounded-md">
//             {deposit.check === 2
//               ? "안전"
//               : deposit.check === 1
//               ? "보통"
//               : "위험"}
//           </span>
//         </div>
//         <div className="flex justify-between items-center mb-5">
//           <div className="text-center flex-1">
//             <div className="bg-green-200 text-white px-4 py-2 rounded-lg font-bold w-20 mx-auto">
//               {deposit.facts.userDeposit.value}
//               {deposit.facts.userDeposit.unit}
//             </div>
//             <p className="text-xs font-bold text-green-200 mt-1">
//               사용자 보증금
//             </p>
//           </div>
//           <div className="w-4" />
//           <div className="text-center flex-1">
//             <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold w-20 mx-auto">
//               {deposit.facts.complexAvg.value}
//               {deposit.facts.complexAvg.unit}
//             </div>
//             <p className="text-xs font-bold text-gray-500 mt-1">
//               단지 평균 보증금
//             </p>
//           </div>
//         </div>
//         {deposit.items.map((item, idx) => (
//           <p key={idx} className="text-sm text-gray-700 mb-3 leading-relaxed">
//             {item.label}
//           </p>
//         ))}
//         <div className="bg-[#F6FAF9] rounded-lg p-3 text-sm text-gray-600 flex items-start gap-2">
//           <span className="text-lg">💡</span>
//           <p>
//             최근 전세 사기 유형에서 평균 대비 10~20% 이상 높은 보증금이
//             반복적으로 등장하는 경우 주의가 필요해요.
//           </p>
//         </div>
//       </div>

//       {/* 건축물대장 분석 */}
//       <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl p-5">
//         <div className="flex items-center mb-4">
//           <h3 className="font-semibold mb-3">건축물대장 분석</h3>
//           <span className="mx-2 mb-3 px-2 py-1 text-xs font-bold text-white bg-[#2A83FF] rounded-md">
//             {building.check === 2
//               ? "안전"
//               : building.check === 1
//               ? "보통"
//               : "위험"}
//           </span>
//         </div>
//         <div className="flex items-start gap-4 mb-4">
//           <img
//             src="/icons/building.png"
//             alt="건축물 아이콘"
//             className="w-20 h-20"
//           />
//           <div className="flex flex-col text-sm text-gray-700">
//             <p>주 용도: {building.facts.usage}</p>
//             <p>준공년도: {building.facts.year}년</p>
//             <p>특성: {building.facts.features.join(", ")}</p>
//           </div>
//         </div>
//         {building.items.map((item, idx) => (
//           <p key={idx} className="text-sm text-gray-600 leading-relaxed">
//             {item.label}
//           </p>
//         ))}
//       </div>

//       {/* 등기부등본 상세 분석 */}
//       <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl p-5 space-y-6">
//         <h3 className="font-bold text-lg mb-2">등기부등본 상세 분석</h3>
//         {/* 소유권 */}
//         <div>
//           <div className="flex items-center mb-2">
//             <h4 className="font-semibold">소유권</h4>
//             <span className="ml-2 px-2 py-1 text-xs font-bold text-white bg-[#2A83FF] rounded-md">
//               {ownership.check === 2
//                 ? "안전"
//                 : ownership.check === 1
//                 ? "보통"
//                 : "위험"}
//             </span>
//           </div>
//           <ul className="text-sm text-gray-700 space-y-2">
//             {ownership.items.map((item, idx) => (
//               <li key={idx} className="flex items-start">
//                 <img
//                   src={
//                     item.is_check
//                       ? "/icons/greencheck.png"
//                       : "/icons/warning.png"
//                   }
//                   alt="체크 아이콘"
//                   className="w-4 h-4 mr-2 mt-1"
//                 />
//                 <span>{item.label}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <hr className="my-4 border-gray-200" />
//         {/* 근저당 */}
//         <div>
//           <div className="flex items-center mb-2">
//             <h4 className="font-semibold">근저당/담보</h4>
//             <span className="ml-2 px-2 py-1 text-xs font-bold text-white bg-[#2A83FF] rounded-md">
//               {mortgage.check === 2
//                 ? "안전"
//                 : mortgage.check === 1
//                 ? "보통"
//                 : "위험"}
//             </span>
//           </div>
//           <ul className="text-sm text-gray-700 space-y-2">
//             {mortgage.items.map((item, idx) => (
//               <li key={idx} className="flex items-start">
//                 <img
//                   src={
//                     item.is_check
//                       ? "/icons/greencheck.png"
//                       : "/icons/warning.png"
//                   }
//                   alt="체크 아이콘"
//                   className="w-4 h-4 mr-2 mt-1"
//                 />
//                 <span>{item.label}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <hr className="my-4 border-gray-200" />
//         {/* 기타 권리사항 */}
//         <div>
//           <div className="flex items-center mb-2">
//             <h4 className="font-semibold">기타 권리사항</h4>
//             <span className="ml-2 px-2 py-1 text-xs font-bold text-white bg-[#2A83FF] rounded-md">
//               {otherright.check === 2
//                 ? "안전"
//                 : otherright.check === 1
//                 ? "보통"
//                 : "위험"}
//             </span>
//           </div>
//           <ul className="text-sm text-gray-700 space-y-2">
//             {otherright.items.map((item, idx) => (
//               <li key={idx} className="flex items-start">
//                 <img
//                   src={
//                     item.is_check
//                       ? "/icons/greencheck.png"
//                       : "/icons/warning.png"
//                   }
//                   alt="체크 아이콘"
//                   className="w-4 h-4 mr-2 mt-1"
//                 />
//                 <span>{item.label}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* 위험요소 종합 평가 */}
//       <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl p-5">
//         <div className="flex items-center mb-4">
//           <h3 className="font-semibold">위험요소 종합 평가</h3>
//           <span className="ml-2 px-2 py-1 text-xs font-bold text-white bg-[#2A83FF] rounded-md">
//             {finalevaluation.check === 2
//               ? "안전"
//               : finalevaluation.check === 1
//               ? "보통"
//               : "위험"}
//           </span>
//         </div>
//         <p className="text-green-200 font-bold text-center mb-4">
//           {finalevaluation.conclusion}
//         </p>
//         <div className="flex justify-center mb-4">
//           <img
//             src="/icons/housecheck.png"
//             alt="집 아이콘"
//             className="w-20 h-20"
//           />
//         </div>
//         <ul className="text-sm text-gray-700 space-y-2 mb-5">
//           {finalevaluation.items.map((item, idx) => (
//             <li key={idx} className="flex items-start">
//               <img
//                 src={
//                   item.is_check ? "/icons/greencheck.png" : "/icons/warning.png"
//                 }
//                 alt="체크"
//                 className="w-4 h-4 mr-2 mt-1"
//               />
//               <span>{item.label}</span>
//             </li>
//           ))}
//         </ul>
//         <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
//           <p className="mb-2">
//             💡 신축 오피스텔 특성상 다수 임차인이 유사 조건으로 입주할 수 있어
//             보증금 반환 리스크가 생기지만, 개인 소유 단일 호실이라 위험은
//             제한적이에요.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }

// src/components/RiskContent.jsx
import React from "react";

// 아이콘을 동적으로 선택하기 위한 헬퍼 객체
const checkIcons = {
  1: "/icons/warning.png", // 보통 (노란색 경고 아이콘으로 대체)
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

  return (
    <section className="space-y-3 pt-1">
      {/* 빠르게 보는 종합 결론 */}
      {summary && (
        <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl p-4">
          <h3 className="font-semibold mb-3">{summary.title}</h3>
          <p className="bg-[#EAF2F1] text-zinc-700 text-sm font-medium px-3 py-4 rounded-lg mb-3 leading-relaxed">
            {summary.desc}
          </p>
          <ul className="space-y-2">
            {summary.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <img
                  src={checkIcons[item.check] || "/icons/warning.png"}
                  alt="체크"
                  className="w-5 h-5 mt-0.5"
                />
                <p className="text-sm text-gray-700">{item.label}</p>
              </li>
            ))}
          </ul>
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
          <div className="flex justify-between items-center mb-5">
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
          </div>
          {deposit.facts.info && (
            <div
              className="bg-orange-50 border-l-4 border-orange-400 text-orange-700 p-4 mb-4"
              role="alert"
            >
              <p className="font-bold">안내</p>
              <p>{deposit.facts.info}</p>
            </div>
          )}
          <ul className="space-y-3">
            {deposit.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <img
                  src={checkIcons[item.check] || "/icons/warning.png"}
                  alt="체크"
                  className="w-5 h-5 mt-0.5"
                />
                <p className="text-sm text-gray-700">{item.label}</p>
              </li>
            ))}
          </ul>
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
                <b>특성:</b> {building.facts.features.join(", ")}
              </p>
            </div>
          </div>
          <ul className="space-y-3">
            {building.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <img
                  src={checkIcons[item.check] || "/icons/warning.png"}
                  alt="체크"
                  className="w-5 h-5 mt-0.5"
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
                    className="w-5 h-5 mt-0.5"
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
                    className="w-5 h-5 mt-0.5"
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
                    className="w-5 h-5 mt-0.5"
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
          <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 mb-4">
            <p>{finalevaluation.conclusion}</p>
          </div>
          <ul className="text-sm text-gray-700 space-y-2 mb-5">
            {finalevaluation.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <img
                  src={checkIcons[item.check] || "/icons/warning.png"}
                  alt="체크"
                  className="w-5 h-5 mt-0.5"
                />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

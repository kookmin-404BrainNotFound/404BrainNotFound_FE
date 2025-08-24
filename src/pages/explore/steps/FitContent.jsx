// FitContent.jsx;
// // src/components/FitContent.jsx
// import React from "react";

// export default function FitContent({ data }) {
//   if (!data || !data.description) return null;

//   const { summary, building } = data.description;

//   return (
//     <section className="space-y-3 pt-1">
//       {/* 빠르게 보는 종합 결론 */}
//       <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl p-4">
//         <h3 className="font-semibold mb-3">{summary.title}</h3>
//         <div className="bg-[#EAF2F1] text-green-200 text-center font-bold px-3 py-2 rounded-lg mb-3">
//           {summary.desc}
//         </div>
//         {summary.items.map((item, idx) => (
//           <p key={idx} className="text-sm text-gray-700 leading-relaxed mt-2">
//             {item.label}
//           </p>
//         ))}
//       </div>

//       {/* 사용자 성향 분석 (임시 하드코딩) */}
//       <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl p-5">
//         <div className="flex items-center mb-4">
//           <h3 className="font-semibold mb-3">사용자 성향 분석</h3>
//           <span className="mx-2 mb-3 px-2 py-1 text-xs font-bold text-white bg-[#2A83FF] rounded-md">
//             안전
//           </span>
//         </div>
//         <div className="flex justify-between items-center mb-5">
//           <img src="/icons/alltypeicons.png" alt="성향 아이콘" />
//           <div className="w-4" />
//         </div>
//         <p className="text-sm text-gray-700 mb-3 leading-relaxed">
//           다원님은 소음에 매우 민감하고 조용한 환경, 직사광선 없이 서늘한 집,
//           평균 천장 높이, 북향 선호, 아늑함을 원한다고 응답했어요.
//         </p>
//       </div>

//       {/* 건축물 및 위치 특성 */}
//       <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl p-5">
//         <div className="flex items-center mb-4">
//           <h3 className="font-semibold mb-3">건축물 및 위치 특성</h3>
//           <span className="mx-2 mb-3 px-2 py-1 text-xs font-bold text-white bg-[#2A83FF] rounded-md">
//             안전
//           </span>
//         </div>
//         <div className="flex items-start gap-4 mb-4">
//           <img
//             src="/icons/building.png"
//             alt="건축물 아이콘"
//             className="w-16 h-16"
//           />
//           <div className="flex flex-col text-sm text-gray-700">
//             <p>
//               <span className="mr-2">주 용도</span>
//               {building.facts.usage}
//             </p>
//             <p>
//               <span className="mr-2">준공년도</span>
//               {building.facts.year}년
//             </p>
//             <p>
//               <span className="mr-2">특성</span>
//               {building.facts.features.join(", ")}
//             </p>
//           </div>
//         </div>
//         <section className="space-y-4 px-5 mb-5">
//           <ul className="space-y-3">
//             {building.items.map((item, idx) => (
//               <li key={idx} className="flex items-start gap-2">
//                 <img
//                   src={
//                     item.is_check
//                       ? "/icons/greencheck.png"
//                       : "/icons/warning.png"
//                   }
//                   alt="체크"
//                   className="w-5 h-5 mt-0.5"
//                 />
//                 <p className="text-sm text-gray-700">{item.label}</p>
//               </li>
//             ))}
//           </ul>
//         </section>
//         <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
//           <p className="mb-2">
//             💡 오피스텔은 주거용이지만 업무시설로 분류되어 일부 세금이나 관리
//             규정에서 차이가 있을 수 있어요.
//           </p>
//           <p>
//             본 건은 <span className="font-semibold">개인 소유 단일 호실</span>
//             이기 때문에 해당 리스크도 제한적이에요.
//           </p>
//         </div>
//       </div>

//       {/* 공기질 및 환경 */}
//       <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl p-5 space-y-6">
//         <h3 className="font-bold text-lg mb-2">공기질 및 환경</h3>
//         <div>
//           <img
//             src="/icons/forest.png"
//             alt="나무 아이콘"
//             className="w-16 h-16"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

// src/components/FitContent.jsx
import React from "react";

// 아이콘을 동적으로 선택하기 위한 헬퍼 객체
const checkIcons = {
  1: "/icons/warning.png", // 보통
  2: "/icons/greencheck.png", // 안전
};

export default function FitContent({ data }) {
  // 데이터가 없으면 렌더링하지 않음
  if (!data) return null;

  // data prop에서 필요한 데이터를 직접 구조 분해 할당
  const { summary, preferences, air, flood, otherItems } = data;

  return (
    <section className="space-y-3 pt-1">
      {/* 빠르게 보는 종합 결론 */}
      {summary && (
        <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl p-4">
          <h3 className="font-semibold mb-3">{summary.title}</h3>
          <p className="bg-[#EAF2F1] text-zinc-700 text-sm font-medium px-3 py-4 rounded-lg mb-3 leading-relaxed">
            {summary.desc}
          </p>
        </div>
      )}

      {/* 사용자 성향 분석 */}
      {preferences && (
        <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl p-5">
          <div className="flex items-center mb-4">
            <h3 className="font-semibold">사용자 성향 분석</h3>
          </div>
          <ul className="space-y-3">
            {preferences.items.map((item, idx) => (
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

      {/* 공기질 및 환경 */}
      {air && (
        <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl p-5">
          <h3 className="font-bold text-lg mb-4">공기질</h3>
          <ul className="space-y-3 mb-4">
            {air.items.map((item, idx) => (
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
                  className="w-5 h-5 mt-0.5"
                />
                <p className="text-sm text-gray-700">{item.label}</p>
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

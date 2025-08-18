// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import Header from "../components/Header";
// import DaumPostcode from "react-daum-postcode";
// import Button from "../components/Button";

// export default function ExploreLayout() {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [address, setAddress] = useState("");

//   const handleOpenPopup = () => setIsPopupOpen(true);
//   const handleClosePopup = () => setIsPopupOpen(false);

//   const handleComplete = (data) => {
//     let fullAddress = data.address;
//     let extraAddress = "";

//     if (data.addressType === "R") {
//       if (data.bname) extraAddress += data.bname;
//       if (data.buildingName)
//         extraAddress += extraAddress
//           ? `, ${data.buildingName}`
//           : data.buildingName;
//       fullAddress += extraAddress ? ` (${extraAddress})` : "";
//     }

//     setAddress(fullAddress);
//     handleClosePopup();
//   };

//   return (
//     <>
//       <Header title="매물 분석" />

//       <div className="min-h-screen max-w-max bg-gray-200">
//         <div className="mx-auto max-w-md min-h-screen flex flex-col">
//           {/* 상단 흰색 패널 */}
//           <section className="bg-white rounded-b-3xl px-4 pt-3 pb-6 shadow-sm">
//             <div className="w-10 h-10 rounded-md mb-6 bg-gray-300" />

//             <h1 className="text-2xl font-bold leading-snug">
//               분석받고 싶은 매물의 주소를
//             </h1>
//             <h1 className="text-2xl font-bold leading-snug">입력해 주세요</h1>

//             <p className="text-gray-500 text-sm mt-2.5">
//               AI가 매물을 분석하여{" "}
//               <span className="font-semibold">적합도/위험도 리포트</span>를
//               만들어 줘요.
//             </p>

//             {/* 주소 입력 */}
//             <div className="mt-4">
//               <div
//                 className="flex items-center w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100"
//                 onClick={handleOpenPopup}
//               >
//                 <input
//                   className="w-full text-sm outline-none border-none bg-transparent cursor-pointer"
//                   placeholder="서울시 멋쟁이구 사자동 2025-12"
//                   readOnly
//                   value={address}
//                 />
//                 <button className="shrink-0 hover:opacity-80" type="button">
//                   <img src="/icons/search.png" alt="검색" className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </section>

//           {/* 설명 카드 */}
//           <section className="px-4 mt-4">
//             <div className="rounded-xl bg-white border border-gray-200 p-4">
//               <h3 className="font-semibold text-base">
//                 AI가 어떻게 분석해 주나요?
//               </h3>
//               <p className="text-gray-500 text-sm mt-1.5">
//                 AI가 다음 데이터 분석 데이터를 바탕으로 적합도/위험도 점수를
//                 계산하고, 상세 내용을 담은 리포트를 제공해요.
//               </p>

//               <ul className="mt-4 space-y-3">
//                 {[
//                   "전세사기 어쩌고저쩌고 분석",
//                   "공공데이터 어쩌고저쩌고 위험도 확인",
//                   "뭐시기무시기 정보 위험도 확인",
//                 ].map((t, i) => (
//                   <li key={i} className="flex items-center gap-3">
//                     <span className="w-3.5 h-3.5 rounded-full bg-gray-200 inline-block" />
//                     <span className="text-sm text-gray-700">{t}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </section>

//           {/* 하단 버튼 */}

//           <div className="mt-3 p-4">
//             <Button>다음</Button>
//           </div>
//         </div>
//       </div>

//       {/* 주소 검색 모달 */}
//       {isPopupOpen && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
//             <DaumPostcode onComplete={handleComplete} autoClose />
//             <button
//               className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
//               onClick={handleClosePopup}
//               type="button"
//             >
//               닫기
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// /* 탭 필요 시 사용 */
// function Tab({ to, end, children }) {
//   return (
//     <NavLink
//       to={to}
//       end={end}
//       className={({ isActive }) =>
//         `px-3.5 py-2 rounded-xl text-sm transition ${
//           isActive
//             ? "bg-indigo-600 text-white shadow-sm"
//             : "text-gray-600 hover:bg-gray-100"
//         }`
//       }
//     >
//       {children}
//     </NavLink>
//   );
// }

// // import React, { useState } from "react";
// // import { NavLink } from "react-router-dom";
// // import Header from "../components/Header";
// // import DaumPostcode from "react-daum-postcode";

// // export default function ExploreLayout() {
// //   const [isPopupOpen, setIsPopupOpen] = useState(false);
// //   const [address, setAddress] = useState("");

// //   const handleOpenPopup = () => setIsPopupOpen(true);
// //   const handleClosePopup = () => setIsPopupOpen(false);

// //   const handleComplete = (data) => {
// //     let fullAddress = data.address;
// //     let extraAddress = "";

// //     if (data.addressType === "R") {
// //       if (data.bname) extraAddress += data.bname;
// //       if (data.buildingName)
// //         extraAddress += extraAddress
// //           ? `, ${data.buildingName}`
// //           : data.buildingName;
// //       fullAddress += extraAddress ? ` (${extraAddress})` : "";
// //     }

// //     setAddress(fullAddress);
// //     handleClosePopup();
// //   };

// //   return (
// //     <>
// //       <Header title="매물 분석" />

// //       <div className="-mx-5 bg-gray-100 max-h-max">
// //         {/* 중앙 컨테이너 (모바일 폭) */}
// //         <div className="mx-auto max-w-md min-h-screen flex flex-col">
// //           {/* 상단 흰색 패널 */}
// //           <section className="bg-white rounded-b-3xl px-4 pt-3 pb-6 shadow-sm">
// //             <div className="w-10 h-10 rounded-md mb-6 bg-gray-300" />

// //             <h1 className="text-2xl font-bold leading-snug">
// //               분석받고 싶은 매물의 주소를
// //             </h1>
// //             <h1 className="text-2xl font-bold leading-snug">입력해 주세요</h1>

// //             <p className="text-gray-500 text-sm mt-2.5">
// //               AI가 매물을 분석하여{" "}
// //               <span className="font-semibold">적합도/위험도 리포트</span>를
// //               만들어 줘요.
// //             </p>

// //             {/* 주소 입력 */}
// //             <div className="mt-4">
// //               <div
// //                 className="flex items-center w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100"
// //                 onClick={handleOpenPopup}
// //               >
// //                 <input
// //                   className="w-full text-sm outline-none border-none bg-transparent cursor-pointer"
// //                   placeholder="서울시 멋쟁이구 사자동 2025-12"
// //                   readOnly
// //                   value={address}
// //                 />
// //                 <button className="shrink-0 hover:opacity-80" type="button">
// //                   <img src="/icons/search.png" alt="검색" className="w-5 h-5" />
// //                 </button>
// //               </div>
// //             </div>
// //           </section>

// //           {/* 설명 카드 */}
// //           <section className="px-4 mt-4">
// //             <div className="rounded-xl bg-white border border-gray-200 p-4">
// //               <h3 className="font-semibold text-base">
// //                 AI가 어떻게 분석해 주나요?
// //               </h3>
// //               <p className="text-gray-500 text-sm mt-1.5">
// //                 AI가 다음 데이터 분석 데이터를 바탕으로 적합도/위험도 점수를
// //                 계산하고, 상세 내용을 담은 리포트를 제공해요.
// //               </p>

// //               <ul className="mt-4 space-y-3">
// //                 {[
// //                   "전세사기 어쩌고저쩌고 분석",
// //                   "공공데이터 어쩌고저쩌고 위험도 확인",
// //                   "뭐시기무시기 정보 위험도 확인",
// //                 ].map((t, i) => (
// //                   <li key={i} className="flex items-center gap-3">
// //                     <span className="w-3.5 h-3.5 rounded-full bg-gray-200 inline-block" />
// //                     <span className="text-sm text-gray-700">{t}</span>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           </section>

// //           {/* 하단 버튼 */}
// //           <div className="mt-auto p-4">
// //             <button
// //               type="button"
// //               className="w-full rounded-xl py-4 bg-gray-300 text-gray-900 font-semibold"
// //             >
// //               다음
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* 주소 검색 모달 */}
// //       {isPopupOpen && (
// //         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
// //           <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
// //             <DaumPostcode onComplete={handleComplete} autoClose />
// //             <button
// //               className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
// //               onClick={handleClosePopup}
// //               type="button"
// //             >
// //               닫기
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }

// // /* 필요하면 탭 사용 */
// // function Tab({ to, end, children }) {
// //   return (
// //     <NavLink
// //       to={to}
// //       end={end}
// //       className={({ isActive }) =>
// //         `px-3.5 py-2 rounded-xl text-sm transition ${
// //           isActive
// //             ? "bg-indigo-600 text-white shadow-sm"
// //             : "text-gray-600 hover:bg-gray-100"
// //         }`
// //       }
// //     >
// //       {children}
// //     </NavLink>
// //   );
// // }

// src/layouts/ExploreLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function ExploreLayout() {
  return (
    <div className="flex flex-col ">
      {/* 모든 /explore 페이지에 공통 헤더 */}
      <Header title="매물 분석" />

      {/* 페이지 콘텐츠 */}
      <div className="px-5 flex-1 ">
        <Outlet />
      </div>
    </div>
  );
}

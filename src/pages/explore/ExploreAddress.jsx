// src/pages/ExploreAddress.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";

export default function ExploreAddress() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname) extraAddress += data.bname;
      if (data.buildingName)
        extraAddress += extraAddress
          ? `, ${data.buildingName}`
          : data.buildingName;
      fullAddress += extraAddress ? ` (${extraAddress})` : "";
    }
    setAddress(fullAddress);
    setIsPopupOpen(false);
  };

  const goNext = () => {
    if (!address) return alert("주소를 먼저 선택해 주세요!");
    navigate("/explore/deal", { state: { address } }); // ← 주소 전달
  };

  return (
    <>
      <div className="-mx-4 bg-gray-200 min-h-screen">
        <div className="mx-auto max-w-md min-h-screen flex flex-col">
          <section className="bg-white rounded-b-3xl px-4 pt-3 pb-6 shadow-sm">
            <div className="w-10 h-10 rounded-md mb-6 bg-gray-300" />
            <h1 className="text-2xl font-bold leading-snug">
              매물의 거래 형태와 보증금을
            </h1>
            <h1 className="text-2xl font-bold leading-snug">입력해 주세요</h1>
            <p className="text-gray-500 text-sm mt-2.5">
              AI가 매물을 분석하여{" "}
              <span className="font-semibold">적합도/위험도 리포트</span>를
              만들어 줘요.
            </p>

            <div className="mt-4">
              <div
                className="flex items-center w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100"
                onClick={() => setIsPopupOpen(true)}
              >
                <input
                  className="w-full text-sm outline-none border-none bg-transparent cursor-pointer"
                  placeholder="서울시 멋쟁이구 사자동 4"
                  readOnly
                  value={address}
                />
                <img src="/icons/search.png" alt="검색" className="w-5 h-5" />
              </div>
            </div>
          </section>

          {/* 하단 버튼 */}
          <div className="mt-auto p-4">
            <button
              type="button"
              onClick={goNext}
              className="w-full rounded-xl py-4 bg-gray-300 text-gray-900 font-semibold hover:bg-gray-400 transition-colors"
            >
              다음
            </button>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
            <DaumPostcode onComplete={handleComplete} autoClose />
            <button
              className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={() => setIsPopupOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
}

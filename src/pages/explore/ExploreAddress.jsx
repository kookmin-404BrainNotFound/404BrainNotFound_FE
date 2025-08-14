import React, { useEffect, useState } from "react";
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
      if (data.buildingName) {
        extraAddress += extraAddress
          ? `, ${data.buildingName}`
          : data.buildingName;
      }
      fullAddress += extraAddress ? ` (${extraAddress})` : "";
    }
    setAddress(fullAddress);
    setIsPopupOpen(false);
  };

  const goNext = () => {
    if (!address) {
      alert("주소를 먼저 선택해 주세요!");
      return;
    }
    navigate("/explore/deal", { state: { address } });
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPopupOpen]);

  return (
    <>
      <div className="-mx-5 bg-gray-100 min-h-screen">
        <div className="mx-auto max-w-md min-h-screen flex flex-col">
          <section className="bg-white rounded-lg px-4 -mt-3 pt-3 pb-4 shadow-sm">
            <div className="w-10 h-10 rounded-md mb-6 bg-gray-300" />
            <h1 className="text-2xl font-bold">분석받고 싶은 매물의 주소를</h1>
            <h1 className="text-2xl font-bold">입력해 주세요</h1>
            <p className="text-gray-500 text-sm mt-2.5">
              AI가 매물을 분석하여{" "}
              <span className="font-semibold">적합도/위험도 리포트</span>를
              만들어 줘요.
            </p>

            <div className="mt-10">
              <button
                type="button"
                className="flex items-center w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 hover:bg-gray-100"
                onClick={() => setIsPopupOpen(true)}
                aria-label="주소 검색 열기"
              >
                <input
                  className="w-full text-sm outline-none border-none bg-transparent pointer-events-none"
                  placeholder="서울시 멋쟁이구 사자동 4"
                  readOnly
                  value={address}
                />
                <img src="/icons/search.png" alt="검색" className="w-5 h-5" />
              </button>
            </div>
          </section>

          <section className="bg-white rounded-lg m-3 mb-none px-4 mt-4 pt-4 pb-3 shadow-sm">
            <h2 className="text-lg font-semibold">
              AI가 어떻게 분석해 주나요?
            </h2>
            <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">
              AI가 다음 데이터 분석 데이터를 바탕으로 적합도/위험도 <br></br>
              점수를 계산하고, 상세 내용을 담은 리포트를 제공해요.
            </p>

            <div className="mt-7 mx-4 rounded-xl mb-2 bg-gray-100 p-4 space-y-3.5">
              {[
                "전세사기 어쩌고저쩌고 분석",
                "공공데이터 어쩌고 위험도 확인",
                "뭐시기뭐시기 정보 위험도 확인",
              ].map((text, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-1 w-3.5 h-3.5 rounded-full bg-gray-300"
                  />
                  <p className="text-gray-700 text-sm">{text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 하단 버튼 */}
          <div className="p-4">
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

      {/* 주소 검색 모달 */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          onClick={() => setIsPopupOpen(false)} // 바깥 클릭 시 닫기
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-md p-4"
            onClick={(e) => e.stopPropagation()} // 내용 클릭은 전파 차단
          >
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

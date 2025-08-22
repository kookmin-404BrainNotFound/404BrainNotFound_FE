import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import Button from "../../components/Button";

export default function ExploreAddress() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
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
    setIsDetailOpen(true);
  };

  const goNext = () => {
    if (!address) {
      alert("✔️ 주소를 먼저 선택해 주세요. ");
      return;
    }
    navigate("/explore/deal", { state: { address } });
  };

  useEffect(() => {
    if (isPopupOpen || isDetailOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPopupOpen, isDetailOpen]);

  return (
    <>
      <div className="-mx-5 bg-gray-100 min-h-screen">
        <div className="mx-auto max-w-md min-h-screen flex flex-col">
          <section className="bg-white rounded-lg px-4 -mt-3 pt-3 pb-5 shadow-sm">
            <img
              src="/icons/dndngraph.png"
              className="w-9 h-12 rounded-md mb-4 mt-8"
            />
            <h1 className="text-2xl font-bold">
              분석받고 싶은 매물의 주소를 <br />
              입력해 주세요
            </h1>

            <p className="text-gray-500 text-sm mt-2.5">
              AI가 매물을 분석하여{" "}
              <span className="font-semibold text-green-200">
                적합도/위험도 리포트
              </span>
              를 만들어 줘요.
            </p>
            <div className="mt-10">
              <button
                type="button"
                className="flex items-center w-full rounded-lg  px-4 py-3 bg-gray-100 hover:bg-gray-100"
                onClick={() => setIsPopupOpen(true)}
                aria-label="주소 검색 열기"
              >
                <input
                  className="w-full text-sm outline-none border-none bg-transparent pointer-events-none"
                  placeholder="주소는 건물번호 끝까지 입력해 주세요."
                  readOnly
                  value={address}
                />
                <img src="/icons/search.png" alt="검색" className="w-5 h-5" />
              </button>
            </div>
          </section>

          <section className="bg-white rounded-lg m-3 mb-none px-4 mt-4 pt-4 pb-3 shadow-sm">
            <div className="justify-start text-zinc-800 text-base font-semibold leading-normal">
              AI가 어떻게 분석해 주나요?
            </div>
            <p className="text-gray-500 text-xs mt-1.5 font-regular leading-2">
              AI가 분석 데이터를 바탕으로 점수를 계산하고, 상세 내용을 담은{" "}
              <br />
              리포트를 제공해요.
            </p>

            <div className="mt-7 mx-4 rounded-xl mb-2  bg-gray-100 p-3 space-y-3">
              {[
                "전세사기 어쩌고저쩌고 분석",
                "공공데이터 어쩌고 위험도 확인",
                "뭐시기뭐시기 정보 위험도 확인",
              ].map((text, idx) => (
                <div key={idx} className="flex items-start ">
                  <span
                    aria-hidden
                    className="mt-1 ml-4 mr-4 w-4 h-4 rounded-full bg-green-200"
                  />
                  <p className="text-gray-700 text-sm">{text}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-5 p-4">
            <Button onClick={goNext} disabled={!address}>
              다음
            </Button>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          onClick={() => setIsPopupOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-md p-4"
            onClick={(e) => e.stopPropagation()}
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

      {isDetailOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
          onClick={() => setIsDetailOpen(false)}
        >
          <div
            className="w-full bg-white rounded-t-2xl p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-sm">
              <span className="font-semibold text-base text-green-200">
                {address}
              </span>
              <div className="mt-1 font-semibold text-base text-gray-700">
                상세 주소를 꼭 입력해 주세요.
              </div>
            </div>

            {/* 상세 주소 입력 */}
            <input
              type="text"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
              placeholder="동, 호수 또는 층수를 입력해 주세요."
              className="mt-4 w-full rounded-lg px-4 py-2.5 text-sm bg-gray-100 placeholder-gray-500 focus:outline-none"
            />

            <button
              type="button"
              disabled={!detailAddress.trim()}
              className={[
                "py-4 mt-6 rounded-xl text-sm w-full transition",
                detailAddress.trim()
                  ? "bg-green-200 text-white"
                  : "bg-green-100 text-white cursor-not-allowed",
              ].join(" ")}
              onClick={() => {
                if (!detailAddress.trim()) return;
                const joined = `${address} ${detailAddress.trim()}`;
                setAddress(joined);
                setIsDetailOpen(false);
                navigate("/explore/deal", { state: { address: joined } });
              }}
            >
              다음
            </button>

            <button
              type="button"
              className="py-4 mt-3 rounded-xl text-sm mb-5 bg-white border border-green-200 text-green-200 w-full"
              onClick={() => {
                setIsDetailOpen(false);
                navigate("/explore/deal", { state: { address } });
              }}
            >
              상세 주소가 없어요
            </button>
          </div>
        </div>
      )}
    </>
  );
}

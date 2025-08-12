import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../components/Header";
import DaumPostcode from "react-daum-postcode";

export default function ExploreLayout() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [address, setAddress] = useState("");

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setAddress(fullAddress);
    handleClosePopup();
  };

  return (
    <>
      <Header title="매물 분석" />
      <div className="rounded-md bg-white p-4">
        {" "}
        <div className="w-10 h-10 rounded-md mb-6 p-4 bg-gray-300"> </div>
        <h1 className="text-2xl font-semibold mb-1">
          분석받고 싶은 매물의 주소를
        </h1>
        <h1 className="text-2xl font-semibold"> 입력해 주세요 </h1>
        <h6 className="text-gray-500 mt-2.5 mb-10">
          AI가 매물을 분석하여{" "}
          <span className="font-semibold">적합도/위험도 리포트</span>를 만들어
          줘요.
        </h6>
        <div className="space-y-5">
          <div className="space-y-3">
            <div
              className="flex items-center w-full rounded-xl border border-gray-200 px-4 py-2.5 cursor-pointer hover:bg-gray-50"
              onClick={handleOpenPopup}
            >
              <input
                className="w-full text-sm outline-none border-none bg-transparent cursor-pointer"
                placeholder="서울시 멋쟁이구 사자동 2025-12"
                readOnly
                value={address}
              />
              <button className="text-gray-600 hover:text-black">
                <img src="/icons/search.png" alt="검색" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
            <DaumPostcode onComplete={handleComplete} autoClose />
            <button
              className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={handleClosePopup}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Tab({ to, end, children }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `px-3.5 py-2 rounded-xl text-sm transition ${
          isActive
            ? "bg-indigo-600 text-white shadow-sm"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

// 예전에 있던 코드(추천, 나의 성향 테스트 바로 가기)
{
  /* <div className="bg-white/80 border rounded-2xl p-2 mt-3 flex gap-2">
        <Tab to="/explore" end>
          추천
        </Tab>
        <Tab to="/explore/test">나의 성향 테스트</Tab>
      </div>

      <Outlet /> */
}

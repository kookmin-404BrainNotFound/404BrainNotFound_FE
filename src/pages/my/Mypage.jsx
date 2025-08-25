import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Mypage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  const goToSettings = () => navigate("/my/settings");
  const goToReports = () => navigate("/my/reports");
  const goToLegal = () => navigate("/my/legal");
  const goToCleaning = () => navigate("/my/clean");

  return (
    <div className="min-h-screen bg-gray-100">
      <div className>
        <div className="bg-white p-5 shadow-sm space-y-3">
          <h2 className="text-2xl font-semibold">
            {username} 님,{" "}
            <span className="text-2xl font-normal">안녕하세요!</span>
          </h2>
          <div className="flex items-center justify-between bg-[#F6FAF9] rounded-2xl p-4 shadow-[0px_0px_10px_2px_rgba(0,0,0,0.03)] border border-[#ADD6CC]">
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">든든포인트</span>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-[#1E4A45]">40</span>
                <img
                  src="/icons/mykey.png"
                  alt="포인트 키"
                  className="w-6 h-6"
                />
              </div>
            </div>

            <button className="bg-green-200 text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-teal-700">
              충전하기
            </button>
          </div>

          <button
            onClick={goToReports}
            className="bg-white rounded-xl p-4 flex items-center justify-between w-full hover:bg-gray-100 border border-[#ADD6CC]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <img src="/icons/mydocs.png" className="w-7 h-9" />
              </div>
              <div className="text-left">
                <div className="text-base font-bold">내 리포트 모아보기</div>
                <div className="text-sm text-gray-500">6건</div>
              </div>
            </div>
            <span className="text-gray-400 text-3xl flex items-center">›</span>
          </button>
        </div>

        <div className="bg-gray-100 rounded-xl p-4 ">
          <div className="mt-4 text-xl font-semibold text-gray-800 mb-4">
            서비스
          </div>

          <div className="space-y-3">
            <button
              onClick={goToLegal}
              className="w-full flex items-center justify-between p-5 bg-white hover:bg-gray-50 rounded-xl shadow-[0px_0px_10px_2px_rgba(0,0,0,0.03)]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img src="/icons/mylawyer.png" className="w-7 h-7" />
                </div>
                <div className="text-left">
                  <div className="font-medium">법률 전문가 상담 신청하기</div>
                  <div className="text-sm text-gray-500">
                    전문가와 함께 안전한 계약 해요
                  </div>
                </div>
              </div>
              <span className="text-gray-400 text-3xl flex items-center">
                ›
              </span>
            </button>

            <button
              onClick={goToCleaning}
              className="w-full flex items-center justify-between p-5 bg-white hover:bg-gray-50 rounded-xl shadow-[0px_0px_10px_2px_rgba(0,0,0,0.03)]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img src="/icons/mycleaner.png" className="w-7 h-7" />
                </div>
                <div className="text-left">
                  <div className="font-medium">이사/청소 서비스 신청하기</div>
                  <div className="text-sm text-gray-500">
                    무료로 견적 받아 보세요!
                  </div>
                </div>
              </div>
              <span className="text-gray-400 text-3xl flex items-center">
                ›
              </span>
            </button>
          </div>
        </div>

        <div className="bg-gray-100 rounded-xl p-4 ">
          <div className="text-xl font-semibold text-gray-800 mb-4">설정</div>
          <div className="divide-y divide-gray-200 bg-white rounded-lg">
            <button
              onClick={goToSettings}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50"
            >
              <span className="font-medium">내 정보 수정</span>
              <span className="text-gray-400 text-3xl flex items-center">
                ›
              </span>
            </button>

            <button
              onClick={() => alert("결제 내역으로 이동")}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50"
            >
              <span className="font-medium">결제 내역</span>
              <span className="text-gray-400 text-3xl flex items-center">
                ›
              </span>
            </button>

            <button
              onClick={() => alert("공지사항으로 이동")}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50"
            >
              <span className="font-medium">공지사항</span>
              <span className="text-gray-400 text-3xl flex items-center">
                ›
              </span>
            </button>

            <button
              onClick={() => alert("고객센터로 이동")}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50"
            >
              <span className="font-medium">고객센터</span>
              <span className="text-gray-400 text-3xl flex items-center">
                ›
              </span>
            </button>
          </div>
        </div>
        <div className="p-10"></div>
      </div>
    </div>
  );
}

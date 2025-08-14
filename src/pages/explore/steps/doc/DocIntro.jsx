import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageHeader from "../../../../components/BackHeader";
import BottomNav from "../../../../components/BottomNav";
import Button from "../../../../components/Button";

export default function DocIntro() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const address = state?.address || "";
  const title = "";
  const [showSheet, setShowSheet] = useState(false);

  return (
    <div className="bg-white min-h-screen">
      <PageHeader title={title} />

      <h1 className="text-2xl font-semibold tracking-tight mt-2">
        등기부등본의장점멘트
      </h1>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">등기부등본이란?</h2>
        <p className="mt-2 text-sm text-gray-700 leading-6">
          특정 부동산(건물, 토지)에 대한 권리 관계 및 현황이 기재된 공적인
          문서예요.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">왜 필요한가요?</h2>
        <p className="mt-2 text-sm text-gray-700 leading-6">
          특정 부동산(건물, 토지)에 대한 권리 관계 및 현황이 기재된 공적인
          문서예요.
        </p>
      </section>

      <div className="mt-10 flex justify-center">
        <div className="w-40 h-40 bg-gray-200 rounded-none" />
      </div>

      <Button onClick={() => setShowSheet(true)} className="mt-10">
        계속
      </Button>

      {showSheet && (
        <div
          className="fixed inset-0 bg-black/40 flex justify-center items-end z-50"
          onClick={() => setShowSheet(false)} // 바깥 클릭 시 닫기
        >
          <div
            onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
            className="bg-white w-full max-w-[375px] rounded-t-2xl p-6 transform transition-transform duration-300 ease-out translate-y-0"
          >
            <p className="text-lg font-semibold mb-4">
              <span className="text-blue-600">{address}</span>의 등기부등본이
              필요해요.
            </p>

            <Button onClick={() => navigate("/doc/method")} className="mb-3">
              발급받아야 해요
            </Button>

            <Button onClick={() => navigate("/doc/upload")}>이미 있어요</Button>

            <button
              onClick={() => setShowSheet(false)}
              className="mt-4 text-sm text-gray-500 w-full"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageHeader from "../../../../components/BackHeader";
import BottomNav from "../../../../components/BottomNav";
import Button from "../../../../components/Button";

export default function DocIntro() {
  const nav = useNavigate();
  const { state } = useLocation();
  const [open, setOpen] = useState(false);

  const goMethod = () => {
    setOpen(false);
    nav("/explore/doc/method"); // 발급 방법 안내 페이지
  };

  const goUpload = () => {
    setOpen(false);
    nav("/explore/doc/upload"); // 파일 업로드/분석 시작 페이지
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="px-3 py-6 space-y-10">
        <div className="py-2 text-xs text-black">매물 위험도 분석
         <h1 className="text-xl font-bold text-black">등기부등본의 장점멘트</h1></div>

        <section className="space-y-10 text-sm text-black leading-6">
          <div>
            <p className="font-semibold mb-0">등기부등본이란?</p>
            <p className="text-black">
              특정 부동산(건물, 토지)에 대한 권리 관계 및 변동이 기록된 공적인 문서예요.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1">왜 필요한가요?</p>
            <p className="text-black">
              소유자, 근저당, 전세권 등 위험 신호를 확인해 계약 전 리스크를 줄일 수 있어요.
            </p>
          </div>
        </section>
        <div className="py-2"></div>
        <div className="w-28 h-28 mx-auto bg-gray-200" aria-hidden />

        <div className="pt-9">
          <Button
            onClick={() => setOpen(true)}
            className="w-full mobile-button text-base"
          >
            계속
          </Button>
        </div>
      </div>

      {open && (
        <>
          {/* DIM: 네비바 제외(top~bottom-16), 중앙 375 포함, 좌/우도 회색 */}
          <div className="fixed top-0 bottom-16 left-0 right-0 z-40" onClick={() => setOpen(false)}>
            {/* 왼쪽 DIM */}
            <div className="absolute top-0 bottom-0 left-0 right-[calc(50%+187.5px) " />
            {/* 중앙 375 DIM */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[375px] bg-black/40" />
            {/* 오른쪽 DIM */}
            <div className="absolute top-0 bottom-0 left-[calc(50%+187.5px)] right-0" />
          </div>

          {/* Sheet: 네비바 위에 375 고정 */}
          <div className="fixed inset-x-0 py-5 bottom-10 z-50 flex justify-center pointer-events-none">
            <div className="w-[375px] rounded-t-2xl bg-white px-6 py-8 pointer-events-auto">
              <p className="text-base text-lg">
                <span className="text-blue-600 font-semibold">{state?.address || "서울시 멋쟁이구 사자로 4"}</span>
                <span className="text-gray-900">의 등기부등본이 필요해요.</span>
              </p>

              <div className="mt-4 space-y-3">
                <button
                  onClick={goMethod}
                  className="w-full rounded-xl border border-gray-200 bg-gray-200 px-4 py-4 text-md font-medium hover:bg-white active:scale-[0.99]"
                >
                  발급받아야 해요
                </button>
                <button
                  onClick={goUpload}
                  className="w-full rounded-xl border border-gray-200 bg-gray-200 px-4 py-4 text-md font-medium hover:bg-white active:scale-[0.99]"
                >
                  이미 있어요
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
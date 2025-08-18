import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackHeader from "../../../../components/BackHeader";
import Button from "../../../../components/Button";

export default function DocIntro() {
  const nav = useNavigate();
  const { state } = useLocation();

  const payload = state || {};
  const { address = "", dealType, deposit, monthly } = payload;

  const [open, setOpen] = useState(false);

  const goMethod = () => {
    setOpen(false);
    nav("/explore/doc/method", { state: payload });
  };

  const goUpload = () => {
    setOpen(false);
    nav("/explore/doc/upload", { state: payload });
  };

  return (
    <div className="min-h-screen bg-white">
      <BackHeader title="" />

      <div className="px-1">
        <p className="text-sm text-black mb-[6px]">매물 위험도 분석</p>
        <h1 className="text-xl font-bold text-black mb-[51px]">등기부등본의 장점멘트</h1>

        <section className="space-y-10 text-sm text-black leading-6">
          <div>
            <p className="font-medium mb-[9px]">등기부등본이란?</p>
            <p className="text-xs">특정 부동산(건물, 토지)에 대한 권리 관계 및 변동이 기록된 공적인 문서예요.</p>
          </div>
          <div>
            <p className="font-medium mb-1">왜 필요한가요?</p>
            <p className="text-xs">소유자, 근저당, 전세권 등 위험 신호를 확인해 계약 전 리스크를 줄일 수 있어요.</p>
          </div>
        </section>

        <div className="mt-16 w-28 h-28 mx-auto bg-gray-200" />

        <div className="pt-20">
          <Button onClick={() => setOpen(true)} className="w-full mobile-button text-base">
            계속
          </Button>
        </div>
      </div>

      {open && (
        <>
          <div className="fixed top-0 bottom-16 left-0 right-0 z-40" onClick={() => setOpen(false)}>
            <div className="absolute top-0 bottom-0 left-0 right-[calc(50%+187.5px)]" />
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[375px] bg-black/40" />
            <div className="absolute top-0 bottom-0 left-[calc(50%+187.5px)] right-0" />
          </div>

          <div className="fixed inset-x-0 py-5 bottom-10 z-50 flex justify-center pointer-events-none">
            <div className="w-[375px] rounded-t-2xl bg-white px-6 py-8 pointer-events-auto">
              <p className="text-base">
                <span className="text-blue-600 font-semibold">{address || "주소 없음"}</span>
                <span className="text-gray-900"> 의 등기부등본이 필요해요.</span>
              </p>

              <div className="mt-4 space-y-3">
                <button
                  onClick={goMethod}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-4 text-md font-medium hover:bg-gray-200 active:scale-[0.99]"
                >
                  발급받아야 해요
                </button>
                <button
                  onClick={goUpload}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-4 text-md font-medium hover:bg-gray-200 active:scale-[0.99]"
                >
                  이미 있어요
                </button>
              </div>

              {/* 필요하면 payload 전체를 확인 */}
              {/* <pre className="text-xs text-gray-600">{JSON.stringify(payload, null, 2)}</pre> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

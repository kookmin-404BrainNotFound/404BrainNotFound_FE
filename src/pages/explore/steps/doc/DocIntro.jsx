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
        
        <p className="text-sm font-semibold text-green-200 mb-[6px]">매물 정밀 안전도 분석</p>
        <h1 className="text-xl font-bold text-black mb-[51px]">등기부등본의 장점멘트</h1>
        

        {/* 콜아웃 섹션 */}
        <section className="space-y-3 text-sm text-black">
          {/* 콜아웃 1 */}
          <div className="rounded-2xl bg-gray-50 px-4 py-4">
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <p className="font-semibold mb-1">💡 등기부등본이란?</p>
                <p className="text-xs text-gray-600 leading-5">
                  부동산에 관한 권리 관계를 적어 두는 등기부를 복사한 공적 문서예요.
                </p>
              </div>
            </div>
          </div>

          {/* 콜아웃 2 */}
          <div className="rounded-2xl bg-gray-50 px-4 py-4">
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <p className="font-semibold mb-1">🔎 왜 필요한가요?</p>
                <p className="text-xs text-gray-600 leading-5">
                  등기부등본에 나와 있는 매물의 권리 관계, 소유권, 채무 등을 분석하여 정밀 안전도를 측정할 수 있어요.
                </p>
              </div>
            </div>
          </div>
        </section>


        <div className="py-60">
          <Button onClick={() => setOpen(true)} className="w-full mobile-button text-white text-semibold bg-green-200 text-base hover:bg-green-300 mb-3">
            계속
          </Button>
          <Button onClick={() => setOpen(true)} className="w-full mobile-button bg-zinc-100 text-semibold text-zinc-500 hover:bg-zinc-100 ">
            괜찮아요
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
            <div className="w-[375px] rounded-t-2xl bg-white px-6 py-3 pointer-events-auto">
              <p className="text-base">
                <span className="text-green-200 font-semibold">{address || "주소 없음"}</span>
                <span className="text-gray-900 font-semibold"> 의 등기부등본이 필요해요.</span>
              </p>

              <div className="mt-4 space-y-3">
                <button
                  onClick={goMethod}
                  className="w-full rounded-xl border bg-green-200 px-4 py-4 text-white text-md font-medium hover:bg-green-300 active:scale-[0.99]"
                >
                  아니요, 발급받아야 해요
                </button>
                <button
                  onClick={goUpload}
                  className="w-full rounded-xl border border-green-200 bg-white px-4 py-4 text-green-200 text-md font-medium active:scale-[0.99] hover:bg-zinc-100"
                >
                  네, 이미 있어요
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

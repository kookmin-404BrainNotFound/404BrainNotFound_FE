import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackHeader from "../../../../components/PageHeader";
import Button from "../../../../components/Button";

function Step({ no, title, desc, img }) {
  return (
    <div className="flex gap-3 py-5">
      <div className="shrink-0">
        <div className="w-6 h-6 rounded-md bg-green-300 text-white flex items-center justify-center text-xs font-semibold">
          {no}
        </div>
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        {desc && <p className="text-xs text-gray-600 mt-1">{desc}</p>}
        {img && (
          <div className="mt-3 overflow-hidden bg-white">
            <img src={img} alt={title} className="w-full object-cover" />
          </div>
        )}
      </div>
    </div>
  );
}

export default function DocMethod() {
  const nav = useNavigate();
  const { state } = useLocation();
  const { payload = {} } = state || {};
  const [open, setOpen] = useState(false);

  const goUpload = () => {
    setOpen(false);
    nav("/explore/doc/upload", { state: { payload } });
  };

  const openIROS = () => {
    window.open("https://www.iros.go.kr", "_blank", "noopener,noreferrer");
  };

  const steps = [
    { no: 1, title: "대법원 인터넷등기소(iros.go.kr) 접속하기", desc: "PC/모바일 모두 가능해요. 아래 버튼으로 바로 이동할 수 있어요.", img: "/images/docmethod/step1.png" },
    { no: 2, title: "발급받고 싶은 매물의 주소를 검색하여 선택하기", desc: "건물/집합건축물/대지 항목을 정확히 선택해 주세요.", img: "/images/docmethod/step2.png" },
    { no: 3, title: "매물을 선택하고 ‘다음’으로 넘어가기", desc: "매물 리스트에서 해당 건물을 선택하고 다음 버튼을 눌러 주세요.", img: "/images/docmethod/step3.png" },
    { no: 4, title: "발급(열람) 등본과 등기기록 유형 선택하기", desc: "일반(갑구/을구 포함) 등기사항증명서로 선택하면 분석에 충분해요.", img: "/images/docmethod/step4.png" },
    { no: 5, title: "수수료 결제 후 PDF 저장하기", desc: "결제 완료 후 ‘인쇄/저장’을 눌러 PDF로 저장해 주세요.", img: "/images/docmethod/step5.png" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <BackHeader title="" />

      <main className="px-1 pb-28">
        <p className="text-sm text-green-200 mb-2">매물 위험도 분석</p>
        <h1 className="text-xl font-bold text-gray-900">등기부등본, 간단하게 발급받기</h1>

        <p className="text-base font-bold text-black mt-10">어디에서 발급받나요?</p>
        <p className="text-xs text-black mt-1">PC, 모바일 둘 다 가능해요. 대법원 인터넷등기소에서 발급받을 수 있어요.</p>

        <div className="mt-4 grid grid-cols-1 gap-2">
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-3">
            <div className="space-y-3 px-10 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-800">🖥️ PC: 대법원 인터넷등기소 (iros.go.kr)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-800">📱 모바일: 인터넷등기소 앱</span>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="text-base font-semibold text-gray-900">PC에서 발급받는 방법</h2>
          <p className="text-xs text-black mt-1">어렵지 않아요. 차근차근 따라 해보세요.</p>
          <div className="text-sm mt-2 divide-y">
            {steps.map((s) => (
              <Step key={s.no} {...s} />
            ))}
          </div>
        </section>
      </main>

      {/* 하단 고정 CTA */}
      <div className="fixed inset-x-0 bottom-4">
        <div className="mx-auto w-full max-w-[375px] px-5">
          <Button
            onClick={() => setOpen(true)}
            className="w-full mobile-button bg-green-200 text-white hover:bg-green-300"
          >
            다음
          </Button>
        </div>
      </div>

      {/* 바텀시트 (DocIntro 방식) */}
      {open && (
        <>
          <div className="fixed top-0 bottom-16 left-0 right-0 z-40" onClick={() => setOpen(false)}>
            <div className="absolute top-0 bottom-0 left-0 right-[calc(50%+187.5px)]" />
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[375px] bg-black/40" />
            <div className="absolute top-0 bottom-0 left-[calc(50%+187.5px)] right-0" />
          </div>

          <div className="fixed inset-x-0 py- bottom-0 z-50 flex justify-center pointer-events-none">
            <div className="w-[375px] h-[256px] rounded-t-2xl bg-white px-6 py-3 pointer-events-auto">
              <p className="text-base">
                <span className="text-gray-900 font-semibold">발급 완료하셨나요?</span>
              </p>

              <div className="mt-4 space-y-3">
                <button
                  onClick={goUpload}
                  className="w-full rounded-xl border bg-green-200 px-4 py-4 text-white text-md font-medium hover:bg-green-300 active:scale-[0.99]"
                >
                  네, 파일 등록하러 갈게요
                </button>
                <button
                  onClick={openIROS}
                  className="w-full rounded-xl border border-green-200 bg-white px-4 py-4 text-green-200 text-md font-medium active:scale-[0.99] hover:bg-zinc-100"
                >
                  아니요, 인터넷등기소 열기
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

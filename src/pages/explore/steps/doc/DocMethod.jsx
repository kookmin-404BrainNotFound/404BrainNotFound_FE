import { useLocation, useNavigate } from "react-router-dom";
import BackHeader from "../../../../components/BackHeader";
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
          <div className="mt-3 overflow-hidden  bg-white">
            {/* 실제 스샷 이미지를 public에 넣었다면 src만 바꾸기 */}
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
  const { payload = {} } = state || {}; // 안전하게 이어받기

  const goUpload = () => {
    nav("/explore/doc/upload", { state: { payload } });
  };

  const openIROS = () => {
    window.open("https://www.iros.go.kr", "_blank", "noopener,noreferrer");
  };

  const steps = [
    {
      no: 1,
      title: "대법원 인터넷등기소(iros.go.kr) 접속하기",
      desc: "PC/모바일 모두 가능해요. 아래 버튼으로 바로 이동할 수 있어요.",
      img: "/images/docmethod/step1.png", // 필요 시 실제 파일로 교체
    },
    {
      no: 2,
      title: "발급받고 싶은 매물의 주소를 검색하여 선택하기",
      desc: "건물/집합건축물/대지 항목을 정확히 선택해 주세요.",
      img: "/images/docmethod/step2.png",
    },
    {
      no: 3,
      title: "매물을 선택하고 ‘다음’으로 넘어가기",
      desc: "매물 리스트에서 해당 건물을 선택하고 다음 버튼을 눌러 주세요.",
      img: "/images/docmethod/step3.png",
    },
    {
      no: 4,
      title: "발급(열람) 등본과 등기기록 유형 선택하기",
      desc: "일반(갑구/을구 포함) 등기사항증명서로 선택하면 분석에 충분해요.",
      img: "/images/docmethod/step4.png",
    },
    {
      no: 5,
      title: "수수료 결제 후 PDF 저장하기",
      desc: "결제 완료 후 ‘인쇄/저장’을 눌러 PDF로 저장해 주세요.",
      img: "/images/docmethod/step5.png",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <BackHeader title="" />

      <main className="px-1 pb-2">
        <p className="text-sm text-green-200 mb-2">매물 위험도 분석</p>
        <h1 className="text-xl font-bold text-gray-900">
          등기부등본, 간단하게 발급받기
        </h1>
        <p className="text-base font-bold text-black mt-10">
          어디에서 발급받나요?
        </p>        
        <p className="text-xs text-black mt-1">
          PC, 모바일 둘 다 가능해요. 대법원 인터넷등기소에서 발급받을 수 있어요.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-2">
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-3">
            <div className="space-y-3 px-10 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-800">
                  🖥️ PC: 대법원 인터넷등기소 (iros.go.kr)
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-800">
                  📱 모바일: 인터넷등기소 앱
                </span>
              </div>
            </div>                  
          </div>
        </div>


        {/* PC에서 발급받는 방법(가이드) */}
        <section className="mt-8">
          <h2 className="text-base font-semibold text-gray-900">
            PC에서 발급받는 방법
          </h2>
          <p className="text-xs text-black mt-1">
            어렵지 않아요. 차근차근 따라 해보세요.
          </p>

          <div className="text-sm mt-2 divide-y">
            {steps.map((s) => (
              <Step
                key={s.no}
                no={s.no}
                title={s.title}
                desc={s.desc}
                img={s.img}
              />
            ))}
          </div>
        </section>

        {/* 여백: 하단 고정 CTA와 겹치지 않게 */}
        <div className="h-10" />
      </main>

      {/* 하단 고정 CTA */}
      <div className="fixed bottom-16 left-52 right-52 px-5">
        <Button
          onClick={goUpload}
          className="w-full mobile-button bg-green-200 text-white hover:bg-green-300"
        >
          등기부등본 파일 등록하러 가기
        </Button>
      </div>
    </div>
  );
}

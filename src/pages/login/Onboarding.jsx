import { useNavigate } from "react-router-dom";
import { useState } from "react";
function SegmentProgressBar({ current, total }) {
  return (
    <div className="fixed top-0 left-0 right-0 w-full px-4 pt-3 bg-white z-30">
      <div className="flex items-center">
        {Array.from({ length: total }).map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 transition-colors duration-300 ${
              // 현재 단계(current) 이전의 모든 막대는 활성 색상으로 표시
              index <= current ? "bg-green-200" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

   const onboardingSteps = [
    {
      id: 1,
      text: (
        <>
          혼자서도 안전한 집 계약,
          <br />
          <span className="text-green-200 font-semibold">든든집</span>이
          도와줄게요
        </>
      ),
      image: "/icons/onboarding1.png",
    },
    {
      id: 2,
      text: (
        <>
          주거 성향만 입력하면
          <br />
          나와 매물의 궁합을 알려드려요
        </>
      ),
      image: "/icons/onboarding2.png",
    },
    {
      id: 3,
      text: (
        <>
          하나도 빠뜨리지 않도록
          <br />
          계약 체크리스트를 참고하세요
        </>
      ),
      image: "/icons/onboarding3.png",
    },
    {
      id: 4,
      text: (
        <>
          이 매물은 몇 점?
          <br />
          적합도/안전도 리포트로 확인해요
        </>
      ),
      image: "/icons/onboarding4.png",
    },
    {
      id: 5,
      text: (
        <>
          계약서 분석 리포트와 함께
          <br />
          안전하게 계약하세요
        </>
      ),
      image: "/icons/onboarding5.png",
    },
    {
      id: 6,
      text: (
        <>
          계약이 끝나면 새로운 시작,
          <br />
          이사/청소 무료로 견적 받아요
        </>
      ),
      image: "/icons/onboarding6.png",
    },
  ];

   const goNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // 마지막 단계에서는 로그인 페이지로 이동
      navigate("/login");
    }
  };

  // 이전 단계로 이동하는 함수
  const goPrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-24 px-6 select-none relative">
      <SegmentProgressBar
        current={currentStep}
        total={onboardingSteps.length}
      />

      <div className="relative z-10 text-center">
        <h2 className="text-2xl font-bold text-gray-800 leading-snug mb-16">
          {onboardingSteps[currentStep].text}
        </h2>
        <img
          src={onboardingSteps[currentStep].image}
          alt={`온보딩 ${onboardingSteps[currentStep].id}`}
          className="max-w-[300px] w-full h-auto object-contain inline-block"
        />
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white to-transparent flex flex-col justify-end items-center pb-8 px-6 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation(); // 다른 클릭 이벤트와의 충돌 방지
            navigate("/home"); // '/home' 경로로 이동
          }}
          className="w-full max-w-sm bg-green-200 text-white text-lg font-bold py-3 rounded-full shadow-lg hover:bg-green-300 active:scale-95 transition-all"
        >
          시작하기
        </button>
      </div>

      <div className="absolute inset-0 flex z-0">
        <div className="w-1/2 h-full cursor-pointer" onClick={goPrev} />
        <div className="w-1/2 h-full cursor-pointer" onClick={goNext} />
      </div>
    </div>
  );
}

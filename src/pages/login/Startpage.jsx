import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // 10초 후 자동 이동
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 5000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    // 1. 화면 전체를 차지하는 div 컨테이너
    // 2. flexbox를 이용해 내부 요소를 정중앙에 배치
    <div className="flex justify-center items-center h-screen w-screen bg-white">
      {/* 로고 이미지 */}
      <img
        // 3. 'public' 폴더의 파일은 '/' 로 시작하는 절대 경로로 참조
        src="/icons/startlogo.png"
        alt="든든집 시작 로고"
        // 4. 로고 크기 지정 (너비 약 160px), 필요에 따라 조절
        className="w-40 h-auto"
      />
    </div>
  );
}

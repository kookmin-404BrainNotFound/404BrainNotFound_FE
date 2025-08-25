// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function SplashScreen() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // 10초 후 자동 이동
//     const timer = setTimeout(() => {
//       navigate("/onboarding");
//     }, 2000);

//     // 컴포넌트 언마운트 시 타이머 정리
//     return () => clearTimeout(timer);
//   }, [navigate]);

//   return (
//     <div className="flex justify-center items-center h-screen w-screen bg-white">
//       <img
//         src="/icons/startlogo.png"
//         alt="든든집 시작 로고"
//         className="w-40 h-auto"
//       />
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // 2초 후 fadeOut 시작
    const fadeTimer = setTimeout(() => {
      setVisible(false);
    }, 1800);

    // 2.5초 후 페이지 이동
    const navTimer = setTimeout(() => {
      navigate("/onboarding");
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div
      className={`flex justify-center items-center h-screen w-screen bg-white transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <img
        src="/icons/startlogo.png"
        alt="든든집 시작 로고"
        className="w-40 h-auto"
      />
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CompleteStyle() {
  const navigate = useNavigate();

  const icons = [
    "/icons/bgnoise.png",
    "/icons/bgsunlight.png",
    "/icons/bgceiling.png",
    "/icons/bgdirection.png",
    "/icons/bgetc.png",
  ];

  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation((prev) => prev - 360 / icons.length);
    }, 1000);
    return () => clearInterval(timer);
  }, [icons.length]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between py-16">
      <div className="text-center px-6">
        <h1 className="text-[24px] font-bold text-gray-900 mb-2">
          주거 성향 입력이 완료되었어요!
        </h1>
        <p className="text-green-200 text-[16px]">
          입력하신 내용을 참고해서 매물을 분석할게요
        </p>
      </div>

      <div className="relative w-56 h-56 flex items-center justify-center">
        {icons.map((src, idx) => {
          const baseAngle = (idx / icons.length) * 2 * Math.PI;
          const angle = baseAngle + (rotation * Math.PI) / 180;
          const radius = 90;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <img
              key={`${src}-${idx}`}
              src={src}
              alt={`icon-${idx}`}
              className="absolute w-20 h-20 rounded-full transition-all duration-700"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            />
          );
        })}
      </div>

      <div className="w-full max-w-[420px] px-6 space-y-3">
        <button
          onClick={() => navigate("/home")}
          className="w-full py-4 bg-green-200 text-white rounded-xl text-base font-medium hover:bg-green-900"
        >
          홈으로 돌아가기
        </button>
        <button
          onClick={() => navigate("/home/style/noise")}
          className="w-full py-4 bg-gray-100 text-gray-500 rounded-xl text-base font-medium"
        >
          다시하기
        </button>
      </div>
    </div>
  );
}

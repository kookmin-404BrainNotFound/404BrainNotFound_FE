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

  // ✅ Complete 페이지 진입 시 localStorage → DB 저장
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("housingStyle") || "{}");

    // 1) payload 만들기 (user_id 고정 2)
    const payload = {
      description: {
        Q1: "소음에 얼마나 민감하신가요?",
        A1: saved.noise,
        Q2: "햇빛 잘 드는 집이 좋으신가요?",
        A2: saved.sunlight,
        Q3: "천장 높이가 중요하신가요?",
        A3: saved.ceiling,
        Q4: "선호하는 집 방향이 있나요?",
        A4: saved.direction,
        Q5: "더 고려해야 할 요소가 있나요?",
        A5: saved.etc,
      },
    };
    // 2) API 호출
    const saveTendency = async () => {
      try {
    const userId = 2;
    const res = await fetch(`/api/user/${userId}/tendency/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });


        if (!res.ok) throw new Error(`저장 실패 (status: ${res.status})`);
        console.log("✅ 저장 성공:", await res.json()); //확인용 콘솔 삭제 가능
      } catch (err) {
        console.error("❌ API 에러:", err);
      }
    };

    saveTendency();
  }, []);

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

      <div className="relative w-64 h-64 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="w-40 h-40 rounded-full border-4 border-gray-200/40" />
        </div>

        <img
          src="/icons/grsearch.png"
          alt="search"
          className="relative z-20 w-10 h-10 object-contain"
        />

        <div className="absolute inset-0 flex items-center justify-center z-10">
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
                className="absolute w-20 h-20 rounded-full transition-transform duration-700"
                style={{ transform: `translate(${x}px, ${y}px)` }}
              />
            );
          })}
        </div>
      </div>

      <div className="w-full max-w-[420px] px-6 space-y-3">
        <button
          onClick={() => navigate("/home")}
          className="w-full py-4 bg-green-200 text-white rounded-xl text-base font-medium hover:bg-green-300"
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

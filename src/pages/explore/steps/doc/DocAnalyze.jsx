import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../components/PageHeader";

export default function DocAnalyze() {
  const nav = useNavigate();

  const TARGET = 100;
  const [progress, setProgress] = useState(0);

  const steps = useMemo(
    () => [
      "등기부등본과 건축물대장 꼼꼼히 확인하기",
      "시세 비교하고 주변 환경까지 살펴보기",
      "@@ 님의 성향과 잘 맞는지 분석하기",
    ],
    []
  );
  const [checkedCount, setCheckedCount] = useState(0);

  // 북쪽(윗쪽) 반원: 각도 0° ↔ 180° 왕복
  const [angle, setAngle] = useState(0); // 시작을 오른쪽(0°)에서
  const dirRef = useRef(1); // +1 → 증가(오른쪽→왼쪽), -1 → 감소(왼쪽→오른쪽)

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= TARGET) {
          clearInterval(t);
          return TARGET;
        }
        return p + 1;
      });
    }, 40);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const tick = setInterval(() => {
      setCheckedCount((c) => {
        if (c >= steps.length) {
          clearInterval(tick);
          return c;
        }
        return c + 1;
      });
    }, 1500);
    return () => clearInterval(tick);
  }, [steps.length]);

  useEffect(() => {
    const id = setInterval(() => {
      setAngle((a) => {
        const next = a + dirRef.current * 1.5; // 속도
        if (next > 180) {
          dirRef.current = -1;
          return 180;
        }
        if (next < 0) {
          dirRef.current = 1;
          return 0;
        }
        return next;
      });
    }, 16);
    return () => clearInterval(id);
  }, []);

  const radius = 67;
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = -Math.sin(rad) * radius;

  return (
    <div className="min-h-screen bg-white px-6">
      <PageHeader title="" />

      <div className="pt-8 text-center">
        <h1 className="text-xl font-bold text-gray-800 leading-snug">
          AI가 매물의 적합도와 안전도를
          <br />
          측정하고 있어요
        </h1>
      </div>

      <div className="relative mx-auto mt-8 w-56 h-56">
        <img
          src="/icons/lghouse.png"
          alt="house"
          className="absolute left-1/2 top-1/2 w-36 h-36 -translate-x-1/2 -translate-y-1/2 object-contain"
        />
        <img
          src="/icons/bordersearch.png"
          alt="magnifier"
          className="absolute left-1/2 top-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 transition-transform duration-100"
          style={{
            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
          }}
        />
      </div>

      <p className="text-center text-green-300 font-semibold">
        {progress}% 진행 중
      </p>

      <div className="mt-6 rounded-2xl divide-y bg-white">
        {steps.map((t, i) => {
          const on = i < checkedCount;
          return (
            <div key={t} className="-mx-3 py-5 flex items-center gap-3">
              <span
                className={[
                  "ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full border",
                  on
                    ? "bg-green-200 border-green-200"
                    : "bg-white border-green-200",
                ].join(" ")}
              >
                {on ? (
                  <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 text-white">
                    <path
                      d="M5 10.5l3 3 7-7"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
              </span>
              <p className={on ? "text-gray-800" : "text-gray-800"}>{t}</p>
            </div>
          );
        })}
      </div>

      <div className="h-28" />
    </div>
  );
}

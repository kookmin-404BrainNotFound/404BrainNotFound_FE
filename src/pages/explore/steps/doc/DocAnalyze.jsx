import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../components/PageHeader";

export default function DocAnalyze() {
  const nav = useNavigate();

  const TARGET = 100;
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

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
    if (isComplete) return;
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
  }, [isComplete]);

  useEffect(() => {
    if (progress !== TARGET || isComplete) return;
    const to = setTimeout(() => setIsComplete(true), 1500);
    return () => clearTimeout(to);
  }, [progress, isComplete]);

  const radius = 67;
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = -Math.sin(rad) * radius;

  return (
    <div className="min-h-screen bg-white ">
      <PageHeader title="" />

      <div className="pt-8 text-center">
        {!isComplete ? (
          <h1 className="text-2xl font-bold text-gray-800 leading-snug">
            AI가 매물의 적합도와 안전도를
            <br />
            측정하고 있어요
          </h1>
        ) : (
          <h1 className="text-2xl font-bold text-gray-800 leading-snug">
            적합도와 안전도 측정이 <br />
            완료되었어요!{" "}
          </h1>
        )}
      </div>

      <div className="relative mx-auto mt-8 w-56 h-56">
        {/* 집은 항상 표시 */}
        <img
          src="/icons/lghouse.png"
          alt="house"
          className="absolute left-1/2 top-1/2 w-36 h-36 -translate-x-1/2 -translate-y-1/2 object-contain"
        />

        {isComplete ? (
          // 완료: 돋보기+스파클 합본 오버레이
          <img
            src="/icons/analyzedone.png"
            alt="analyze done"
            className="absolute left-1/2 top-[48%] w-[214px] h-[165px] -translate-x-1/2 -translate-y-1/2 object-contain z-10"
          />
        ) : (
          // 진행 중: 돋보기 애니메이션
          <img
            src="/icons/grsearch.png"
            alt="magnifier"
            className="absolute left-1/2 top-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 transition-transform duration-100"
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
          />
        )}
      </div>

      <p className="text-center text-green-200 font-semibold">
        {isComplete ? "측정 완료!" : `${progress}% 진행 중`}
      </p>

      <div className="mt-6 rounded-2xl divide-y bg-white">
        {steps.map((t, i) => {
          const on = i < checkedCount;
          return (
            <div key={t} className="mx-3 py-5 flex items-center gap-3">
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

import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageHeader from "../../components/PageHeader";

export default function ContractAnalyze() {
  const nav = useNavigate();
  const { state } = useLocation(); 
  const { files = [], userId = 2 } = state || {};

  const TARGET = 100;
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const steps = useMemo(
    () => [
      "계약서 이미지 업로드 중",
      "GPT 기반 위험 요소 분석",
      "계약 안정성 평가 결과 도출",
    ],
    []
  );
  const [checkedCount, setCheckedCount] = useState(0);

  // ✅ 계약서 분석 API 호출
  const analyzeContract = async () => {
    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("images", f));
      formData.append("user_id", userId);

      console.log("📤 계약서 업로드 시작:", files);

      const res = await fetch(`/api/contract/startContract/${userId}`, {
        method: "POST",
        body: formData,
      });


      if (!res.ok) {
        const errText = await res.text();
        throw new Error("계약서 분석 실패: " + errText);
      }

      const data = await res.json();
      console.log("📊 계약서 분석 결과:", data);

      // 📌 응답 구조 반영
      console.log("📝 분석 ID:", data.id);
      console.log("🖼️ 업로드된 이미지 목록:", data.description.images);
      console.log("📍 주소:", data.description.answer.address);
      console.log("🏠 상세:", data.description.answer.details);

      setAnalysisResult(data);
      return data;
    } catch (err) {
      console.error("❌ 계약서 분석 API 에러:", err);
      return null;
    }
  };

  // 초기 실행: 분석 API 호출
  useEffect(() => {
    if (files.length === 0) return;

    const run = async () => {
      const result = await analyzeContract();
      if (!result) {
        alert("계약서 분석에 실패했습니다. 다시 시도해주세요.");
        return;
      }
      setIsComplete(true);

      // 분석 완료 후 1.5초 뒤 결과 페이지 이동
      setTimeout(() => {
        nav("/contract/result", {
          state: {
            from: "analyze",
            contractResult: result, // 서버 분석 결과 전달
          },
        });
      }, 1500);
    };

    run();
  }, [files, userId, nav]);

  // 진행률 애니메이션
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

  // 단계별 체크 애니메이션
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

  // 돋보기 애니메이션
  const [angle, setAngle] = useState(0);
  const dirRef = useRef(1);
  useEffect(() => {
    if (isComplete) return;
    const id = setInterval(() => {
      setAngle((a) => {
        const next = a + dirRef.current * 1.5;
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

  const radius = 67;
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = -Math.sin(rad) * radius;

  return (
    <div className="min-h-screen bg-white">
      <PageHeader title="계약서 분석" />

      <div className="pt-8 text-center">
        {!isComplete ? (
          <h1 className="text-2xl font-bold text-gray-800 leading-snug">
            AI가 계약서를 분석하고 있어요
          </h1>
        ) : (
          <h1 className="text-2xl font-bold text-gray-800 leading-snug">
            계약서 분석이 완료되었어요!
          </h1>
        )}
      </div>

      <div className="relative mx-auto mt-8 w-56 h-56">
        {/* 계약서 아이콘 */}
        <img
          src="/icons/minihome.png"
          alt="contract"
          className="absolute left-1/2 top-1/2 w-36 h-36 -translate-x-1/2 -translate-y-1/2 object-contain"
        />

        {isComplete ? (
          <img
            src="/icons/analyzedone.png"
            alt="analyze done"
            className="absolute left-1/2 top-[48%] w-[214px] h-[165px] -translate-x-1/2 -translate-y-1/2 object-contain z-10"
          />
        ) : (
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
        {isComplete ? "분석 완료!" : `${progress}% 진행 중`}
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
              <p className="text-gray-800">{t}</p>
            </div>
          );
        })}
      </div>

      <div className="h-28" />
    </div>
  );
}

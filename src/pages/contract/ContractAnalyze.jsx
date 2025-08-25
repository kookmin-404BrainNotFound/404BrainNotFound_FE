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

  const startContract = async () => {
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
        throw new Error("계약서 업로드 실패: " + errText);
      }

      const data = await res.json();
      console.log("📊 startContract 결과:", data);
      return data; // { id, ... }
    } catch (err) {
      console.error("❌ startContract API 에러:", err);
      return null;
    }
  };

  const analyzeContract = async (contractId) => {
    try {
      console.log("🚀 analyzeContract 호출, contract_id:", contractId);

      const res = await fetch(
        `/api/contract/${contractId}/analyzeContract/`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "X-CSRFTOKEN":
              "zdXkfr3bgHtpgiTc0ZV8blsBs2rDsFNiwqugREB3zav99sdELMOucpkfSgZMbUq3", // ✅ CSRF 토큰 추가
          },
        }
      );

      if (!res.ok) {
        const errText = await res.text();
        throw new Error("GPT 분석 실패: " + errText);
      }

      const data = await res.json();

      console.log("🤖 GPT 분석 결과 전체:", data);
      console.log("🆔 분석 결과 ID:", data.id);
      console.log("📑 계약서 핵심 정보:", data.description?.["계약서의_핵심_정보_추출"]);
      console.log("📌 특약 조항 분석:", data.description?.["특약_조항_분석"]);
      console.log("⚠️ 위험 요소 분석:", data.description?.["위험_요소_분석"]);
      console.log("✅ 최종 정리:", data.description?.["최종_정리"]);

      return data;
    } catch (err) {
      console.error("❌ analyzeContract API 에러:", err);
      return null;
    }
  };

  useEffect(() => {
    if (files.length === 0) return;

    const run = async () => {
      const startResult = await startContract();
      if (!startResult) {
        alert("계약서 업로드에 실패했습니다.");
        return;
      }

      const aiResult = await analyzeContract(startResult.id);
      if (!aiResult) {
        alert("계약서 분석에 실패했습니다.");
        return;
      }

      setAnalysisResult(aiResult);
      setIsComplete(true);

      setTimeout(() => {
        nav("/contract/result", {
          state: {
            from: "analyze",
            contractResult: aiResult, 
          },
        });
      }, 5000);
    };

    run();
  }, [files, userId, nav]);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= TARGET) {
          clearInterval(t);
          return TARGET;
        }
        return p + 1;
      });
    }, 80);
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
    <div className="min-h-screen bg-white px-2">
      <PageHeader title="ㅤ" />

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

import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageHeader from "../../../../components/PageHeader";
import {
  saveUserPrice,
  makeAvgPrice,
  makeBuildingInfo,
} from "../../../../api/report";

export default function DocAnalyze() {
  const nav = useNavigate();
  const { state } = useLocation(); // DealForm에서 넘긴 address, detail, userId 등

  const TARGET = 100;
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [reportId, setReportId] = useState(null);

  const steps = useMemo(
    () => [
      "등기부등본과 건축물대장 꼼꼼히 확인하기",
      "시세 비교하고 주변 환경까지 살펴보기",
      "주거 성향과의 적합도 분석하기",
    ],
    []
  );
  const [checkedCount, setCheckedCount] = useState(0);

  const startReport = async () => {
    try {
      const query = new URLSearchParams({
        road_address: state?.address || "",
        details: state?.detail || "",
        user_id: 2,
      });

      const res = await fetch(`/api/report/startReport/?${query.toString()}`, {
        method: "POST",
        headers: {
          accept: "application/json",
        },
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error("보고서 시작 실패: " + errText);
      }
      const data = await res.json();
      console.log("보고서 시작 결과:", data);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  // 북쪽(윗쪽) 반원: 각도 0° ↔ 180° 왕복
  const [angle, setAngle] = useState(0); // 시작을 오른쪽(0°)에서
  const dirRef = useRef(1); // +1 → 증가(오른쪽→왼쪽), -1 → 감소(왼쪽→오른쪽)

  useEffect(() => {
    const run = async () => {
      try {
        const report = await startReport();
        const reportId = report?.report_id;
        if (!reportId) {
          alert("보고서 생성에 실패했습니다. 다시 시도해 주세요.");
          return;
        }

        setReportId(reportId);

        // 1. 보증금/월세 저장
        await saveUserPrice(reportId, {
          security_deposit: state?.deposit || "0",
          monthly_rent: state?.monthly || "0",
          is_year_rent:
            state?.dealType === "전세" || state?.dealType === "미정",
        });
        console.log("보증금/월세 저장 완료");

        // 2. 평균 시세 계산
        await makeAvgPrice(reportId, 2024);
        console.log("평균 시세 계산 완료");

        // 3. 건축물대장 저장
        await makeBuildingInfo(reportId);
        console.log("건축물대장 저장 완료");
      } catch (err) {
        console.error("API 실행 오류:", err);
      }
    };

    run();
  }, [state]);

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
    const to = setTimeout(() => {
      setIsComplete(true);

      //  1.5초 후에 페이지 이동
      setTimeout(() => {
        nav("/explore/semiscore", {
          state: {
            from: "analyze",
            reportId,
            deposit: state?.deposit,
            monthly: state?.monthly,
            dealType: state?.dealType,
          },
        });
      }, 1500);
    }, 500); // 0.5초 후 완료 화면 표시
    return () => clearTimeout(to);
  }, [progress, isComplete, nav]);

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

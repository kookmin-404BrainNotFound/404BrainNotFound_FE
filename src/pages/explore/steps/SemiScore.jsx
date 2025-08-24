import React, { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../../../components/PageHeader";
import { makeReport } from "../../../api/report";
import FitContent from "./FitContent";
import RiskContent from "./RiskContent";
import DocAnalyze from "./doc/DocAnalyze";

function ScoreBox({ label, score, color }) {
  return (
    <div className="bg-white rounded-xl shadow-[0px_0px_15px_rgba(69,128,119,0.29)] py-6 flex flex-col items-center w-32">
      <p className="text-zinc-800 text-base font-semibold mb-3">{label}</p>
      <div className="w-24 border-b border-zinc-400 mb-4"></div>
      <p className="text-4xl font-bold" style={{ color: color }}>
        {score}점
      </p>
    </div>
  );
}

// ✅ 스케일 뷰포트 공통 레이아웃
function ScaledViewport({ children, width = 375, height = 812 }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const s = Math.min(vw / width, vh / height);
      setScale(s);
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, [width, height]);

  return (
    <div>
      <PageHeader title="매물 분석 리포트" />
      <div className="fixed inset-0 bg-white">
        <div
          className="relative shadow-2xl rounded-[18px]"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
          <div className="w-full h-full overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
export default function SemiScore() {
  const nav = useNavigate();
  const { state } = useLocation();
  const search = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const [reportData, setReportData] = useState(null); // API 응답 전체를 저장할 상태

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const reportId = state?.reportId;
        if (!reportId) {
          console.warn("⚠️ reportId 없음 (API 호출 생략)");
          return;
        }
        const data = await makeReport(reportId); // API 호출

        // 🚨 API 응답(배열)을 컴포넌트에서 사용하기 쉽게 객체 형태로 가공
        const formattedData = {
          fit: data.find((item) => item.type === "fit"),
          risk: data.find((item) => item.type === "danger"),
        };
        setReportData(formattedData);
      } catch (err) {
        console.error("❌ 보고서 불러오기 실패:", err);
      }
    };
    fetchReport();
  }, [state]);

  // 주소/보증금/월세 복원
  const initial = useMemo(() => {
    // API 데이터가 있으면 해당 주소를 사용, 없으면 기존 로직 유지
    const addressFromAPI = reportData?.risk?.description?.address;
    if (addressFromAPI) {
      return { address: addressFromAPI };
    }

    const fromState = state || {};
    const fromQuery = {
      address: search.get("address"),
      deposit: search.get("deposit"),
      rent: search.get("monthly"),
    };
    const saved = JSON.parse(localStorage.getItem("explore_form") || "{}");

    return {
      address: fromState?.address || fromQuery.address || saved.address || "",
      deposit:
        fromState?.deposit || fromQuery.deposit || saved.deposit || "5,000만원",
      rent: fromState?.rent || fromQuery.rent || saved.rent || "60만원",
    };
  }, [state, search, reportData]);

  const [tab, setTab] = useState("fit"); // fit | risk

  // 로딩 중 표시

  if (!reportData) {
    return <DocAnalyze />;
  }

  return (
    <ScaledViewport>
      <div className="flex flex-col w-full h-full">
        <main className="px-5 py-4 pb-28 bg-gray-100">
          {/* 상단 헤더 + 점수 섹션 */}
          <div className="-mx-5 py-8 mt-8 bg-gradient-to-br from-[#F6FAF9] to-[#D4EDEA]">
            <div className="flex justify-center mb-4">
              <span className="inline-block px-4 py-1 text-sm font-medium text-[#107868] bg-white rounded-full shadow-sm">
                {/* 🚨 API에서 받아온 주소 정보 표시 */}
                {reportData.risk.description.address}
              </span>
            </div>
            <h2 className="text-center text-2xl font-bold mb-2">
              살기 좋은 집이네요!
            </h2>
            <p className="w-80 mx-auto text-center text-zinc-500 text-xs font-medium leading-relaxed tracking-tight mb-9">
              든든집 AI가 이 매물이 얼마나 적합한지,
              <br />
              주의해야 할 위험 요소는 무엇이 있는지 분석했어요.
            </p>
            <div className="flex justify-center gap-6">
              {/* 🚨 API에서 받아온 점수 동적 표시 */}
              <ScoreBox
                label="적합도 점수"
                score={reportData.fit.score}
                color="#FFBB2A"
              />
              <ScoreBox
                label="안전도 점수"
                score={reportData.risk.score}
                color="#0063F8"
              />
            </div>
          </div>

          {/* 탭 스위치 */}
          <div className="grid grid-cols-2 mb-3 bg-white -mx-5">
            <button
              onClick={() => setTab("fit")}
              className={
                "w-full py-3 text-base font-semibold " +
                (tab === "fit"
                  ? "border-b-2 border-green-200 text-green-200"
                  : "border-b-2 border-transparent text-gray-500")
              }
            >
              적합도 분석
            </button>
            <button
              onClick={() => setTab("risk")}
              className={
                "w-full py-3 text-base font-semibold " +
                (tab === "risk"
                  ? "border-b-2 border-green-200 text-green-200"
                  : "border-b-2 border-transparent text-gray-500")
              }
            >
              안전도 분석
            </button>
          </div>

          {/* 탭 콘텐츠 */}
          <div className="flex-1 bg-gray-100">
            {/* 🚨 각 컴포넌트에 API에서 가공한 데이터 전달 */}
            {tab === "fit" ? (
              <FitContent data={reportData.fit.description} />
            ) : (
              <RiskContent data={reportData.risk.description} />
            )}
          </div>
        </main>
      </div>
    </ScaledViewport>
  );
}

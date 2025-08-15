// src/pages/explore/steps/SemiScore.jsx
import { useMemo, useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

//never used라고 되어있는거 건들이지 말아주세용. 
// UI 디자인이 아직 안나와서 주석처리해두었는데 이거 때문에 문제로 뜹니다 ㅜㅜ

/** 🔧 페이지 내부 전용 스케일 래퍼 (375x812 고정 콘텐츠를 화면에 맞게 scale) */
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
    // 바깥은 화면 꽉 채우고 스크롤 막음 (가로/세로 이동 방지)
    <div className="fixed inset-0 bg-white flex items-center justify-center overflow-x-hidden overflow-y-auto">
      {/* 실제 기기 프레임: 375x812 고정, scale로 축소/확대 */}
      <div
        className="relative shadow-2xl rounded-[18px] bg-gray-50"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {/* 내부만 세로 스크롤 허용 (가로 스크롤 없음) */}
        <div className="w-full h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * "적합도 리포트(세미)" 화면
 * - 실제 점수는 API 연동 전까지 mock 으로 표현
 * - 주소/보증금/월세는 이전 페이지에서 state 로 넘기거나, 쿼리스트링/로컬스토리지에서 복원
 * - 탭: [적합도 결과] / [위험도 결과] (위험도는 등기부 업로드 시 활성화 안내)
 */
export default function SemiScore() {
  const nav = useNavigate();
  const { state } = useLocation();
  const search = new URLSearchParams(location.search);

  // 1) 주소/보증금/월세 파라미터 복원 (state > query > localStorage)
  const initial = useMemo(() => {
    const fromState = state || {};
    const fromQuery = {
      address: search.get("address"),
      deposit: search.get("deposit"),
      rent: search.get("rent"),
    };
    const saved = JSON.parse(localStorage.getItem("explore_form") || "{}");

    return {
      address:
        fromState?.address ||
        fromQuery.address ||
        saved.address ||
        "서울시 멋쟁이구 사자로 4",
      deposit:
        fromState?.deposit || fromQuery.deposit || saved.deposit || "5,000만원",
      rent: fromState?.rent || fromQuery.rent || saved.rent || "60만원",
    };
  }, [state, search]);

  // 2) 모의 점수 (API 연동 전)
  const [score, setScore] = useState(null); // 적합도 점수
  useEffect(() => {
    const t = setTimeout(() => setScore(88), 500);
    return () => clearTimeout(t);
  }, []);

  // 탭 상태
  const [tab, setTab] = useState("fit"); // fit | risk

  return (
    // ✅ 여기서 스케일 래퍼로 감쌈: 창 크기 변화에도 375x812 비율 유지 + 중앙 정렬 + 바깥 스크롤 없음
    <ScaledViewport>
      {/* 내부는 기존 구조를 유지하되, 프레임 기준으로만 동작하도록 정리 */}
      <div className="flex flex-col w-full h-full">
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b" />

        {/* 본문 */}
        <main className="px-5 py-4 pb-28">
          <div className="px-4 py-5 pb-2 mt-16 bg-[#D9D9D9] rounded-xl">
            {/* 상단 주소/요약 */}
            <div className="rounded-xl px-4 py-4 mb-5 bg-white">
              <p className="text-xs text-gray-600 mb-2">{initial.address}</p>
              <h2 className="text-xl font-bold mb-1">살기 좋은 집이네요!</h2>
              <p className="text-[12px] text-black">
                AI가 다원 님에게 이 매물이 얼마나 적합한지, 주의해야 할 위험 요소는 무엇이 있는지 분석했어요.
                점수가 높을수록 적합하고 안전해요.
              </p>
            </div>

            {/* 점수 카드들 */}
            <div className="grid grid-cols-2 gap-8 mb-4">
              <ScoreCard label="적합도 점수">
                {score === null ? (
                  <SkeletonNumber />
                ) : (
                  <span className="text-4xl font-extrabold tracking-tight">
                    {score}
                    <span className="text-4xl ml-1">점</span>
                  </span>
                )}
              </ScoreCard>
              <ScoreCard label="위험도 점수">
                <span className="text-4xl font-extrabold tracking-tight">
                  ??
                  <span className="text-4xl ml-1">점</span>
                </span>
              </ScoreCard>
            </div>
          </div>

          {/* 탭 스위치 */}
          <div className="grid grid-cols-2 border-b mb-3">
            <button
              onClick={() => setTab("fit")}
              className={
                "py-2 text-sm font-medium " +
                (tab === "fit" ? "border-b-2 border-gray-900" : "text-gray-500")
              }
            >
              적합도 결과
            </button>
            <button
              onClick={() => setTab("risk")}
              className={
                "py-2 text-sm font-medium " +
                (tab === "risk" ? "border-b-2 border-gray-900" : "text-gray-500")
              }
            >
              위험도 결과
            </button>
          </div>

          {/* 탭 콘텐츠 */}
          {tab === "fit" ? (
            <FitContent
              score={score}
              deposit={initial.deposit}
              rent={initial.rent}
            />
          ) : (
            <RiskContent />
          )}
        </main>


      </div>
    </ScaledViewport>
  );
}

function ScoreCard({ label, children }) {
  return (
    <div className="bg-white rounded-xl border w-full aspect-square h-32 flex flex-col items-center justify-center">
      <p className="text-xs text-black-500 mb-2">{label}</p>
      <div className="min-h-12 flex items-center">{children}</div>
    </div>
  );
}

function SkeletonNumber() {
  return <div className="w-20 h-9 rounded animate-pulse bg-gray-200" />;
}
function FitContent({ score, deposit, rent }) {
  return (
    <section className="mt-2 space-y-3">
      {/* <div className="rounded-xl border bg-white p-4">
        <h3 className="font-semibold mb-1">요약</h3>
        <p className="text-sm text-gray-600">
          현재 조건(보증금 {deposit}, 월세 {rent}) 기준 임시 적합도는 <b>{score ?? '계산중'}</b>점입니다.
          실제 값은 모델 학습이 완료되면 교체됩니다.
        </p>
      </div> */}      
      <ul className="rounded-xl border bg-white divide-y">
        {/* {[
          { t: "교통/생활편의", v: "역세권 10분, 편의시설 밀집" },
          { t: "치안/환경", v: "유흥/사고 이슈 적음" },
          { t: "가격합리성", v: "동일권역 평균 대비 합리적" },
        ].map((row) => (
          <li key={row.t} className="px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-gray-600">{row.t}</span>
            <span className="text-sm font-medium">{row.v}</span>
          </li>
        ))} */}        
      </ul>
    </section>
  );
}

function RiskContent() {
  return (
    <section className="mt-6">
      <div className="flex flex-col items-center text-center gap-4">

        {/* <div className="w-20 h-20 bg-gray-200 rounded" />
        <div>
          <p className="font-semibold">위험도 점수는 등기부등본 업로드 후 제공됩니다</p>
          <p className="text-sm text-gray-600 mt-1">소유권/근저당/가처분 등의 권리관계를 분석해 위험도를 계산합니다.</p>
        </div>
        <Link
          to="/explore/steps/doc/upload"
          className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-gray-900 text-white text-sm"
        >
          등기부등본 업로드 하러가기
        </Link> */}

      </div>
    </section>
  );
}

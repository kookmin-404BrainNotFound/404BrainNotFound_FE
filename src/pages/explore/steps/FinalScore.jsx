import { useMemo, useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
    <div className="fixed inset-0 bg-white flex items-center justify-center overflow-x-hidden overflow-y-auto">
      <div
        className="relative shadow-2xl rounded-[18px] bg-gray-50"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <div className="w-full h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function SemiScore() {
  const nav = useNavigate();
  const { state } = useLocation();
  const search = new URLSearchParams(location.search);

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

  const [score, setScore] = useState(null); // 적합도 점수
  useEffect(() => {
    const t = setTimeout(() => setScore(88), 500);
    return () => clearTimeout(t);
  }, []);

  // 탭 상태
  const [tab, setTab] = useState("fit"); // fit | risk

  return (
    <ScaledViewport>
      <div className="flex flex-col w-full h-full">
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b" />
        <main className="px-5 py-4 pb-28">
          <div className="px-4 py-5 pb-2 mt-16 bg-[#D9D9D9] rounded-xl">
            <div className="rounded-xl px-4 py-4 mb-5 bg-white">
              <p className="text-xs text-gray-600 mb-2">{initial.address}</p>
              <h2 className="text-xl font-bold mb-1">살기 좋은 집이네요!</h2>
              <p className="text-[12px] text-black">
                AI가 다원 님에게 이 매물이 얼마나 적합한지, 주의해야 할 위험 요소는 무엇이 있는지 분석했어요.
                점수가 높을수록 적합하고 안전해요.
              </p>
            </div>

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
                  33
                  <span className="text-4xl ml-1">점</span>
                </span>
              </ScoreCard>
            </div>
          </div>

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

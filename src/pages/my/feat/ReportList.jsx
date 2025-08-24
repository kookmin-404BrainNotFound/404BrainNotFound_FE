import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../components/PageHeader";

const MOCK_ANALYSIS = [
  {
    id: "r1",
    date: "2025년 8월 22일",
    address: "서울시 멋쟁이구 사자로 4",
    dealType: "월세",
    deposit: 2000,
    monthly: 45,
    semiScore: 80, // 적합도
    riskScore: 50, // 위험도
  },
  {
    id: "r2",
    date: "2025년 8월 22일",
    address: "서울시 멋쟁이구 사자로 4",
    dealType: "월세",
    deposit: 2000,
    monthly: 45,
    semiScore: 80,
    riskScore: 50,
  },
];

const MOCK_CONTRACT = [
  {
    id: "c1",
    date: "2025년 8월 22일",
    address: "서울시 멋쟁이구 사자로 4 102호",
  },
  {
    id: "c2",
    date: "2025년 8월 22일",
    address: "서울시 멋쟁이구 사자로 4 102호",
  },
];

function SimpleCard({ item, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl border border-green-200 p-4 flex items-center justify-between hover:bg-gray-50"
    >
      <div>
        <div className="text-[15px] font-semibold text-gray-900">
          {item.address}
        </div>
        <div className="text-[12px] text-gray-500 mt-1">{item.date}</div>
      </div>
      <span className="text-gray-400 text-xl flex items-center">›</span>
    </button>
  );
}

function ScoreBox({ label, value }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[11px] text-gray-600">{label}</span>
      <div className="min-w-10 px-2 h-10 rounded-md bg-gray-100 flex items-center justify-center">
        <span className="text-base font-semibold">{value}</span>
      </div>
    </div>
  );
}

function ReportCard({ item, compact = false, onClick }) {
  if (compact) {
    return (
      <button
        onClick={onClick}
        className="w-full text-left rounded-xl bg-gray-100 p-4 flex items-start justify-between"
      >
        <div className="flex-1">
          {/* 상단 칩 영역 */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] px-2 py-1 rounded-md bg-gray-300/70 text-gray-800">
              {item.dealType}
            </span>
            <span className="text-[11px] px-2 py-1 rounded-md bg-gray-300/70 text-gray-800">
              {item.deposit}/{item.monthly}
            </span>
          </div>

          {/* 주소, 날짜 */}
          <div className="text-[15px] font-semibold text-gray-900">
            {item.address}
          </div>
          <div className="text-[12px] text-gray-500 mt-1">{item.date}</div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl bg-gray-100 p-4"
    >
      <div className="text-[12px] text-gray-500">{item.date}</div>
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-3">
          <div className="text-[15px] font-semibold text-gray-900 mt-2">
            {item.address}
          </div>

          <div className="flex items-center gap-2 mt-3">
            <span className="text-[11px] px-2 py-1 rounded-md bg-gray-300/70 text-gray-800">
              {item.dealType}
            </span>
            <span className="text-[11px] px-2 py-1 rounded-md bg-gray-300/70 text-gray-800">
              {item.deposit}/{item.monthly}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 flex gap-3 shadow-sm">
          <ScoreBox label="적합도" value={item.semiScore} />
          <ScoreBox label="위험도" value={item.riskScore ?? "-"} />
        </div>
      </div>
    </button>
  );
}

export default function ReportList() {
  const [query, setQuery] = useState("");
  const [orderOpen, setOrderOpen] = useState(false);
  const [order, setOrder] = useState("최신순");
  const [tab, setTab] = useState("analysis"); // ✅ 탭 상태
  const nav = useNavigate();

  const analysisFiltered = useMemo(() => {
    const list = MOCK_ANALYSIS.filter((r) => r.address.includes(query.trim()));
    if (order === "최신순") return list;
    return list.slice().reverse();
  }, [query, order]);

  const contractFiltered = useMemo(() => {
    const list = MOCK_CONTRACT.filter((r) => r.address.includes(query.trim()));
    if (order === "최신순") return list;
    return list.slice().reverse();
  }, [query, order]);

  const goDetail = (item) =>
    nav("/my/reports/detail", { state: { payload: item } });

  return (
    <div className="min-h-screen bg-white px-4">
      {/* 헤더 */}
      <PageHeader title="리포트 모아보기" />

      {/* 탭 스위치 */}
      <div className="grid grid-cols-2 mb-3 bg-white -mx-5">
        <button
          onClick={() => setTab("analysis")}
          className={
            "w-full py-3 text-base font-semibold " +
            (tab === "analysis"
              ? "border-b-2 border-green-200 text-green-200"
              : "border-b-2 border-transparent text-zinc-400")
          }
        >
          매물 분석 리포트
        </button>
        <button
          onClick={() => setTab("contract")}
          className={
            "w-full py-3 text-base font-semibold " +
            (tab === "contract"
              ? "border-b-2 border-green-200 text-green-200"
              : "border-b-2 border-transparent text-zinc-400")
          }
        >
          계약서 리포트
        </button>
      </div>

      {/* 검색 + 정렬 */}
      <div className="mt-3 flex items-center gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="매물의 주소를 검색하세요."
          className="flex-1 h-10 rounded-lg bg-gray-100 px-3 text-sm placeholder:text-gray-400 outline-none"
        />
        <div className="relative">
          <button
            onClick={() => setOrderOpen((v) => !v)}
            className="h-10 px-3 rounded-lg border text-xs flex items-center gap-1"
          >
            {order} <span>▾</span>
          </button>
          {orderOpen && (
            <div className="absolute right-0 mt-1 w-28 rounded-lg border bg-white shadow-sm text-sm">
              {["최신순", "오래된순"].map((o) => (
                <button
                  key={o}
                  onClick={() => {
                    setOrder(o);
                    setOrderOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 hover:bg-gray-50 ${
                    order === o ? "text-black" : "text-gray-600"
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 리스트 */}
      <div className="py-4 space-y-3">
        {tab === "analysis" &&
          (analysisFiltered.length === 0 ? (
            <div className="text-center py-16 text-sm text-gray-500">
              검색 결과가 없습니다.
            </div>
          ) : (
            <>
              {analysisFiltered[0] && (
                <ReportCard
                  item={analysisFiltered[0]}
                  compact
                  onClick={() => goDetail(analysisFiltered[0])}
                />
              )}
              {analysisFiltered.slice(1).map((item) => (
                <ReportCard
                  key={item.id}
                  item={item}
                  onClick={() => goDetail(item)}
                />
              ))}
            </>
          ))}

        {tab === "contract" &&
          (contractFiltered.length === 0 ? (
            <div className="text-center py-16 text-sm text-gray-500">
              검색 결과가 없습니다.
            </div>
          ) : (
            contractFiltered.map((item) => (
              <SimpleCard
                key={item.id}
                item={item}
                onClick={() => goDetail(item)}
              />
            ))
          ))}
      </div>
    </div>
  );
}

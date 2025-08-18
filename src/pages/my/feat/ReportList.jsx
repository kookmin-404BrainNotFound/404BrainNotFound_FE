import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const MOCK = [
  {
    id: "r1",
    date: "2025년 8월 22일",
    address: "서울시 멋쟁이구 사자로 4",
    dealType: "월세",
    deposit: 2000,
    monthly: 45,
    semiScore: 80,   // 적합도
    riskScore: 50,   // (샘플) 위험도 or 두 번째 점수 슬롯
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
  // compact=true → 첫 카드 스타일 
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

  // 두 번째 카드 스타일
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
          <ScoreBox label="적합도" value={item.riskScore ?? "-"} />
        </div>
      </div>
    </button>
  );
}

export default function ReportList() {
  const [query, setQuery] = useState("");
  const [orderOpen, setOrderOpen] = useState(false);
  const [order, setOrder] = useState("최신순");
  const nav = useNavigate();

  const filtered = useMemo(() => {
    const list = MOCK.filter((r) => r.address.includes(query.trim()));
    if (order === "최신순") return list; // 샘플 데이터라 정렬 생략
    return list.slice().reverse();
  }, [query, order]);

  const goDetail = (item) =>
    nav("/my/reports/detail", { state: { payload: item } });

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-white pt-4 pb-3 border-b">
        <div className="flex items-center">
          <button onClick={() => nav(-1)} className="p-2 -ml-2">
            <span className="text-xl">←</span>
          </button>
          <h1 className="flex-1 text-center text-[17px] font-semibold">
            리포트 모아보기
          </h1>
          <div className="w-8" />
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
              className="h-10 px- rounded-lg border text-xs flex items-center gap-1"
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
      </div>

      {/* 리스트 */}
      <div className="py-4 space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-sm text-gray-500">
            검색 결과가 없습니다.
          </div>
        )}

        {filtered[0] && (
          <ReportCard
            item={filtered[0]}
            compact
            onClick={() => goDetail(filtered[0])}
          />
        )}

        {filtered.slice(1).map((item) => (
          <ReportCard key={item.id} item={item} onClick={() => goDetail(item)} />
        ))}
      </div>
    </div>
  );
}

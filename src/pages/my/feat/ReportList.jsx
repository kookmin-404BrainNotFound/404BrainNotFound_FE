import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../components/PageHeader";

const MOCK_ANALYSIS = [
  {
    id: "r1",
    type: "analysis", // 매물 분석 리포트 구분
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

function ReportCard({ item, onClick }) {
  // 매물 분석 리포트
  if (item.type === "analysis") {
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
              <span className="text-[11px] px-2 py-1 rounded-md bg-green-200 text-white">
                {item.dealType}
              </span>
              <span className="text-[11px] px-2 py-1 rounded-md bg-green-200 text-white">
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

  // 계약서 리포트
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl bg-gray-100 p-4"
    >
      <div className="text-[12px] text-gray-500">
        {new Date(item.created_at).toLocaleDateString("ko-KR")}
      </div>
      <div className="text-[15px] font-semibold text-gray-900 mt-2">
        {item.address}
      </div>
      <div className="mt-1 text-[11px] px-2 py-1 rounded-md bg-green-100 text-green-800 inline-block">
        계약서 리포트
      </div>
    </button>
  );
}

export default function ReportList() {
  const [currentTab, setCurrentTab] = useState("analysis"); // 'analysis' or 'contract'
  const [query, setQuery] = useState("");
  const [orderOpen, setOrderOpen] = useState(false);
  const [order, setOrder] = useState("최신순");
  const [contracts, setContracts] = useState([]);
  const nav = useNavigate();

  const getContractsByUser = async (userId, page = 1) => {
    const res = await fetch(
      `/api/contract/getContractByUserId/${userId}?page=${page}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`contracts ${res.status}`);
    }
    return res.json();
  };

  useEffect(() => {
    async function fetchContracts() {
      try {
        const data = await getContractsByUser(2, 1);
        setContracts(data.results.map((c) => ({ ...c, type: "contract" })));
        console.log("✅ 계약서 리포트 데이터 이동 완료:", data.results);
      } catch (err) {
        console.error("❌ 계약서 리포트 불러오기 실패:", err);
      }
    }
    fetchContracts();
  }, []);

  const filteredList = useMemo(() => {
    const list = [...MOCK_ANALYSIS, ...contracts];

    // 1. 탭으로 먼저 필터링
    let tabFiltered = list.filter((item) => item.type === currentTab);

    // 2. 검색어로 필터링
    if (query) {
      tabFiltered = tabFiltered.filter((r) =>
        r.address.includes(query.trim())
      );
    }

    // 3. 정렬
    if (order === "최신순") {
      return tabFiltered.sort(
        (a, b) =>
          new Date(b.created_at || b.date) - new Date(a.created_at || a.date)
      );
    }
    return tabFiltered.sort(
      (a, b) =>
        new Date(a.created_at || a.date) - new Date(b.created_at || b.date)
    );
  }, [query, order, contracts, currentTab]);

  const goDetail = (item) => alert("📌 리포트 상세보기는 준비 중입니다.");

  return (
    <div className="min-h-screen bg-white">
      <PageHeader title="리포트 모아보기" />

{/* 탭 UI */}
<div className="mt-4 border-b">
  <div className="flex">
    <button
      onClick={() => setCurrentTab("analysis")}
      className={`flex-1 text-center px-4 py-2 text-sm font-semibold transition-colors ${
        currentTab === "analysis"
          ? "border-b-2 border-green-200 text-green-200"
          : "text-gray-500 hover:text-black"
      }`}
    >
      매물분석 리포트
    </button>
    <button
      onClick={() => setCurrentTab("contract")}
      className={`flex-1 text-center px-4 py-2 text-sm font-semibold transition-colors ${
        currentTab === "contract"
          ? "border-b-2 border-green-200 text-green-200"
          : "text-gray-500 hover:text-black"
      }`}
    >
      계약서 리포트
    </button>
  </div>
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
            <div className="absolute right-0 mt-1 w-28 rounded-lg border bg-white shadow-sm text-sm z-10">
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
      <div className="py-4 px-2 space-y-3">
        {filteredList.length === 0 && (
          <div className="text-center py-16 text-sm text-gray-500">
            리포트가 없습니다.
          </div>
        )}

        {filteredList.map((item) => (
          <ReportCard
            key={item.id || item.contract_id}
            item={item}
            onClick={() => goDetail(item)}
          />
        ))}
      </div>
    </div>
  );
}
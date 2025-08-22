import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

export default function ExploreAddress() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // ✅ 팝업 상태
  const navigate = useNavigate();
  const [detailAddr, setDetailAddr] = useState("");



  // 🔍 검색 버튼 클릭 → API 호출
  const handleSearch = async () => {
    if (!query.trim()) {
      alert("주소를 입력해주세요!");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `/api/address/search/?q=${encodeURIComponent(query)}&size=10&page=1`,
        { headers: { accept: "application/json" } }
      );

      if (!res.ok) throw new Error("API 요청 실패");

      const data = await res.json();
      console.log("검색 결과:", data);

      setSearchResults(data.results.juso || []);
    } catch (err) {
      console.error("검색 오류:", err);
      alert("주소 검색에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 📍 주소 선택 시 → query 채우기만
  const handleSelectAddress = (address) => {
    setQuery(address);
    setSearchResults([]); // 리스트 닫기
  };

  // 👉 다음 버튼 클릭 → 팝업 열기
  const handleNextClick = () => {
    if (query.trim()) {
      setShowPopup(true);
    }
  };

// 팝업 → deal 페이지 이동
const goDeal = () => {
  navigate("/explore/deal", { state: { address: query, detail: detailAddr } });
};

  return (
    <div className="-mx-5 bg-gray-100 min-h-screen">
      <div className="mx-auto max-w-md min-h-screen flex flex-col">
        <section className="bg-white rounded-lg px-4 -mt-3 pt-3 pb-5 shadow-sm">
          <img
            src="/icons/dndngraph.png"
            className="w-9 h-12 rounded-md mb-4 mt-8"
          />
          <h1 className="text-2xl font-bold">
            분석받고 싶은 매물의 주소를 <br />
            입력해 주세요
          </h1>
          <p className="text-gray-500 text-sm mt-2.5">
            AI가 매물을 분석하여{" "}
            <span className="font-semibold text-green-200">
              적합도/위험도 리포트
            </span>
            를 만들어 줘요.
          </p>

          {/* 검색창 */}
          <div className="mt-10 flex items-center gap-2 border rounded-lg px-3 py-3 bg-gray-100">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="주소는 건물번호 끝까지 입력해 주세요."
              className="flex-1 text-sm outline-none bg-transparent"
            />
            <button onClick={handleSearch}>
              <img src="/icons/search.png" alt="검색" className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* 검색 결과 리스트 */}
        {searchResults.length > 0 && (
          <section className="bg-white rounded-lg mt-3 shadow-sm">
            <ul className="divide-y">
              {searchResults.map((item, idx) => (
                <li
                  key={idx}
                  className="px-4 py-3 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSelectAddress(item.roadAddr)}
                >
                  <p className="font-semibold text-gray-900 text-sm">
                    {item.roadAddr}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{item.jibunAddr}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ✅ "AI가 어떻게 분석해 주나요?" 안내문 */}
        {searchResults.length === 0 && (
          <section className="bg-white rounded-lg m-3 mb-none px-4 mt-4 pt-4 pb-3 shadow-sm">
            <div className="justify-start text-zinc-800 text-base font-semibold leading-normal">
              AI가 어떻게 분석해 주나요?
            </div>
            <p className="text-gray-500 text-xs mt-1.5 font-regular leading-2">
              AI가 분석 데이터를 바탕으로 점수를 계산하고, 상세 내용을 담은{" "}
              <br />
              리포트를 제공해요. 아래는 든든집 AI가 분석하는 과정이에요.
            </p>

            <div className="mt-7 text-sm rounded-xl mb-2 bg-gray-100 p-2 space-y-3">
              {[
                "등기부등본을 자체 발급하여 안전도 측정",
                "건축물대장과 전월세가를 꼼꼼하게 분석",
                "건물 높이, 대기질 정보 등 확인해 적합성 평가",
              ].map((text, idx) => (
                <div key={idx} className="flex items-start">
                  <img
                    src="/icons/checkcircle.png"
                    alt="체크"
                    className="mt-0.5 ml-2 mr-2 w-4 h-4"
                  />  
                  <p className="text-gray-700 text-sm">{text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="mt-5 p-4">
          <button
            onClick={handleNextClick}
            disabled={!query.trim()}
            className={`w-full rounded-lg py-4 text-base font-medium ${
              query.trim()
                ? "bg-green-200 text-white"
                : "bg-green-100 text-white cursor-not-allowed"
            }`}
          >
            다음
          </button>
        </div>

        {/* ✅ 팝업 */}
        {showPopup && (
          <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
            <div className="bg-white rounded-t-2xl w-full max-w-md p-5">
              {/* 상단 주소 */}
              <p className="text-sm font-semibold text-green-200 mb-2">
                {query}
              </p>
              <p className="text-gray-600 text-sm mb-4">
                상세 주소를 꼭 입력해 주세요.
              </p>

      {/* 상세주소 입력칸 */}
      <input
        type="text"
        placeholder="예: 303동 102호"
        value={detailAddr}
        onChange={(e) => setDetailAddr(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 text-sm mb-5 outline-none"
      />

      {/* 버튼들 */}
      <div className="space-y-3">
        <button
          onClick={goDeal}
          disabled={!detailAddr.trim()}  // ✅ 상세주소 없으면 비활성화
          className={`w-full rounded-lg py-3 text-base font-medium ${
            detailAddr.trim()
              ? "bg-green-200 text-white"
              : "bg-green-100 text-white cursor-not-allowed"
          }`}
        >
          다음
        </button>

        <button
          onClick={goDeal}
          className="w-full rounded-lg py-3 text-sm font-medium text-green-200 bg-gray-50"
        >
          상세 주소가 없어요
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
}

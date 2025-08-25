// src/pages/contract/ContractResult.jsx
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button";
import PageHeader from "../../components/PageHeader";

// ✅ 변환 함수: **강조** → <span class="text-green-200">강조</span>
function formatTextWithHighlight(text) {
  if (!text) return "정보 없음";

  // 줄바꿈(\n)은 <br/>로 치환, **텍스트**는 초록색 span으로 치환
  const parts = text.split(/(\*\*.*?\*\*|\n)/g);

  return parts.map((part, idx) => {
    if (part === "\n") {
      return <br key={idx} />;
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      const clean = part.slice(2, -2);
      return (
        <span key={idx} className="text-green-200 font-semibold">
          {clean}
        </span>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}

export default function ContractResult() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { contractResult } = state || {};

  useEffect(() => {
    if (contractResult) {
      console.log("📊 ContractResult에서 받은 결과:", contractResult);
    }
  }, [contractResult]);

  if (!contractResult) {
    return <p className="text-center mt-10">데이터를 불러올 수 없습니다.</p>;
  }

  const desc = contractResult.description || {};

  return (
    <div className="min-h-screen bg-gray-100 px-4">
      <PageHeader title="계약서 분석 리포트" />

      {/* 계약서 핵심 정보 */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <h2 className="font-bold text-lg text-gray-800 mb-4">계약서 핵심 정보</h2>
        <p className="text-gray-700 text-sm">{formatTextWithHighlight(desc["계약서 핵심정보"])}</p>
      </div>

      {/* 특약 조항 분석 */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <h2 className="font-bold text-lg text-gray-800 mb-4">특약 조항 분석</h2>
        <p className="text-gray-700 text-sm">{formatTextWithHighlight(desc["특약조항 분석"])}</p>
      </div>

      {/* 위험 요소 분석 */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <h2 className="font-bold text-lg text-gray-800 mb-4">위험 요소 분석</h2>
        <img src="/icons/danger.png" alt="warning" className="mx-auto w-20 mb-5" />
        <p className="text-gray-700 text-sm">{formatTextWithHighlight(desc["위험요소 분석"])}</p>
      </div>

      {/* 안전한 계약 조언 */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <h2 className="font-bold text-lg text-gray-800 mb-4">안전한 계약 조언</h2>
        <p className="text-gray-700 text-sm">{formatTextWithHighlight(desc["안전한 계약조언"])}</p>
      </div>

      {/* 임차인 확인 필수 항목 */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <h2 className="font-bold text-lg text-gray-800 mb-4">임차인 확인 필수 항목</h2>
        <img src="/icons/checklist.png" alt="checklist" className="mx-auto w-20" />
        <p className="text-gray-700 text-sm">{formatTextWithHighlight(desc["임차인 확인필수항목"])}</p>
        <Button
          onClick={() => navigate("/contract/checklist")}
          className="mt-4 w-full bg-green-200 text-white py-2 rounded-lg"
        >
          계약 체크리스트 바로가기
        </Button>
      </div>

      {/* 최종 정리 */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <h2 className="font-bold text-lg text-gray-800 mb-4">최종 결론 정리</h2>
        <p className="text-gray-700 text-sm">{formatTextWithHighlight(desc["계약서 최종요약"])}</p>
      </div>

      <Button
        onClick={() => navigate("/contract/scan")}
        className="w-full bg-green-200 text-white py-2 rounded-lg mt-6"
      >
        계약서 다시 스캔하기
      </Button>
    </div>
  );
}

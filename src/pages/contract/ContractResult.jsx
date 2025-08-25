// src/pages/contract/ContractResult.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";

export default function ContractResult() {
  const navigate = useNavigate();
  const { contractId } = useParams(); // URL에서 계약서 ID 받는 경우
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ API 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/contracts/${contractId}`);
        if (!res.ok) throw new Error("API 요청 실패");

        const json = await res.json();
        setData(json); // API 응답 저장
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [contractId]);

  if (loading) return <p className="text-center mt-10">불러오는 중...</p>;
  if (!data) return <p className="text-center mt-10">데이터를 불러올 수 없습니다.</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigate(-1)}>←</button>
        <h1 className="font-bold text-lg">계약서 분석 리포트</h1>
        <div />
      </div>

      {/* 다시 스캔하기 */}
      <Button
        onClick={() => navigate("/contract/scan")}
        className="w-full bg-green-200 text-white py-2 rounded-lg mb-6"
      >
        계약서 다시 스캔하기
      </Button>

      {/* 계약서 핵심 정보 */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <h2 className="font-bold text-gray-800 mb-4">계약서 핵심 정보</h2>
        <p><strong>임대 목적물</strong> {data.임대목적물}</p>
        <p><strong>임대 기간</strong> {data.임대기간}</p>
        <p><strong>보증금</strong> {data.보증금} / <strong>월세</strong> {data.월세}</p>
        <p><strong>계약면적</strong> {data.계약면적}㎡ / <strong>전용면적</strong> {data.전용면적}㎡</p>
        <p className="text-sm text-gray-500 mt-3">
          계약 당사자의 이름, 주소, 연락처 정보는 블라인드 처리되었을 수 있으므로 반드시 원본 계약서 확인이 필요합니다.
        </p>
      </div>

      {/* 특약 조항 분석 */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <h2 className="font-bold text-gray-800 mb-4">특약 조항 분석과 추천</h2>
        <p>{data.특약조항분석 || "아직안함"}</p>
      </div>

      {/* 위험 요소 분석 */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <h2 className="font-bold text-gray-800 mb-4">위험 요소 분석</h2>
        <p>{data.위험요소분석 || "위험 요소 분석 결과 없음"}</p>
      </div>
    </div>
  );
}

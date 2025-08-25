import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";

export default function ContractResult() {
  const nav = useNavigate();
  const { state } = useLocation();
  const result = state?.analysisResult;

  if (!result) {
    return (
      <div className="p-6">
        <p className="text-red-500">분석 결과가 없습니다. 다시 시도해주세요.</p>
      </div>
    );
  }

  const desc = result.description || {};

  return (
    <div className="min-h-screen bg-white">
      <PageHeader title="계약서 분석 결과" />

      <div className="p-6 space-y-6">
        {/* 위험 점수 */}
        <div className="p-4 rounded-xl shadow bg-white">
          <h2 className="text-xl font-bold text-gray-800 mb-2">위험 점수</h2>
          <p className="text-2xl font-extrabold text-red-500">{desc["위험_점수"]} 점</p>
        </div>

        {/* 계약서 핵심 정보 */}
        <div className="p-4 rounded-xl shadow bg-white">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">계약서 핵심 정보</h2>
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
            {desc["계약서_핵심_정보"]}
          </p>
        </div>

        {/* 특약 조항 분석 */}
        <div className="p-4 rounded-xl shadow bg-white">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">특약 조항 분석</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{desc["특약_조항_분석"]}</p>
        </div>

        {/* 위험 요소 분석 */}
        <div className="p-4 rounded-xl shadow bg-white">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">위험 요소 분석</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{desc["위험_요소_분석"]}</p>
        </div>

        {/* 최종 정리 */}
        <div className="p-4 rounded-xl shadow bg-white">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">최종 정리</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{desc["최종_정리"]}</p>
        </div>

        {/* 안전 조언 */}
        <div className="p-4 rounded-xl shadow bg-white">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">안전하게 계약하기 위한 조언</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{desc["안전하게_계약하기_위한_조언"]}</p>
        </div>

        {/* 임차인 확인 필수 항목 */}
        <div className="p-4 rounded-xl shadow bg-white">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">임차인 확인 필수 항목</h2>
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
            {desc["임차인_확인_필수_항목"]}
          </p>
        </div>

        {/* 다시 분석 버튼 */}
        <button
          onClick={() => nav(-1)}
          className="w-full mt-6 bg-green-200 text-white py-3 rounded-lg font-medium"
        >
          다시 분석하기
        </button>
      </div>
    </div>
  );
}

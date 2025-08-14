import { useNavigate } from "react-router-dom";

export default function LegalService() {
  const navigate = useNavigate();

  return (
    <div className="p-5 space-y-4">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-500 hover:underline"
      >
        ← 뒤로
      </button>

      <h1 className="text-xl font-bold">법률 전문가 연계 서비스 신청하기</h1>
      <p className="text-gray-700">연계 절차/문의 폼을 여기에 추가하세요.</p>
    </div>
  );
}

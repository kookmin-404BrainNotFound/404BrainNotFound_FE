import { useNavigate } from "react-router-dom";

export default function ReportList() {
  const navigate = useNavigate();

  return (
    <div className="p-5 space-y-4">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-500 hover:underline"
      >
        ← 뒤로
      </button>

      <h1 className="text-xl font-bold">내 리포트 모아보기</h1>
      <p className="text-gray-700">여기에 리포트 목록을 표시합니다.</p>
    </div>
  );
}

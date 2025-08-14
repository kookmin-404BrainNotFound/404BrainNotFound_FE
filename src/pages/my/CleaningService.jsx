import { useNavigate } from "react-router-dom";

export default function CleaningService() {
  const navigate = useNavigate();

  return (
    <div className="p-5 space-y-4">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-500 hover:underline"
      >
        ← 뒤로
      </button>

      <h1 className="text-xl font-bold">이사/청소 서비스 신청하기</h1>
      <p className="text-gray-700">신청 폼/안내 내용을 여기에 추가하세요.</p>
    </div>
  );
}

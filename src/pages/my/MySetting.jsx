import { useNavigate } from "react-router-dom";

export default function MySetting() {
  const navigate = useNavigate();

  return (
    <div className="p-5 space-y-4">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-500 hover:underline"
      >
        ← 뒤로
      </button>
      <h1 className="text-xl font-bold">설정</h1>
      <p className="text-gray-700">개인정보 및 계정설정 추가 예정.</p>
    </div>
  );
}

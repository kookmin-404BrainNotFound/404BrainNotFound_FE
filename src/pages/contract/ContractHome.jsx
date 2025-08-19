import { useNavigate } from "react-router-dom";

export default function ContractHome() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center p-4">
        <button onClick={handleBack} aria-label="뒤로가기">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center text-center px-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          계약서를 준비해 주세요
        </h2>
        <p className="text-sm text-gray-600 mb-8">
          계약 종이나 완료된 계약서를 촬영해 주세요.
          <br />
          올바르게 인식되도록 밝은 곳에서 정방향으로 배치해 주세요.
        </p>

        <div className="w-40 h-40 bg-gray-200 rounded-md mb-8"></div>
      </div>

      <div className="p-4">
        <button className="w-full bg-gray-300 text-black rounded-lg py-3 text-sm">
          계약서 촬영하기
        </button>
      </div>
    </div>
  );
}
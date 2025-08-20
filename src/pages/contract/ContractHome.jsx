import { useNavigate } from "react-router-dom"

export default function ContractHome() {
  const navigate = useNavigate()

  const goScan = () => {
    navigate("/contract/scan", {  }); // payload 전달 유지
  };

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center p-4">
        <button onClick={handleBack} aria-label="뒤로가기">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="black" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="flex-1 flex flex-col px-4 pt-8">
        <p className="text-sm text-green-200 mb-1">계약서 위험 요소 분석</p>
        <h1 className="text-xl font-bold text-gray-900 mb-3">계약서를 준비해 주세요</h1>
        <p className="text-sm text-neutral-600 leading-relaxed">
          쓰고 있는 계약서, 완료된 계약서 전부 괜찮아요.
          <br />
          올바르게 인식되도록 밝은 곳에서 정방향으로 촬영해 주세요.
        </p>
      </div>

      <div className="p-4 pb-11">
        <button onClick={goScan} className=" w-full bg-green-200 text-white rounded-lg py-4 text-base font-medium">계약서 스캔하기</button>
      </div>
    </div>
  )
}

import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ContractHome() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const goScan = () => {
    navigate("/contract/scan", {}); // payload 전달 유지
  };

  const handleBack = () => {
    navigate(-1);
  };

  // 버튼 클릭 → 숨겨둔 input 클릭
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 파일 선택 시 실행
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("업로드된 파일:", file);
      alert(`업로드된 파일: ${file.name}`);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col px-4 pt-10">
        <img
          src="/icons/mdcamera.png"
          alt="camera"
          className="absolute left-1/2 top-1/2 w-36 h-36 -translate-x-1/2 -translate-y-1/2 object-contain"
        />

        <div className="flex items-center mb-4">
          <img
            src="/icons/minihome.png"
            alt="홈 아이콘"
            className="w-9 h-12 mr-2"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          계약서를 분석해 위험 요소를
          <br />
          알려드려요
        </h1>
        <p className="text-sm text-neutral-600 leading-relaxed">
          쓰고 있는 계약서, 완료된 계약서 전부 괜찮아요.
          <br />
          올바르게 인식되도록 밝은 곳에서{" "}
          <span className="text-green-200 font-medium">정방향으로 촬영</span>해
          주세요.
        </p>
      </div>

      <div className="p-4 pb-40 space-y-1">
        <button
          onClick={goScan}
          className="w-full bg-green-200 text-white rounded-lg py-4 text-base font-medium"
        >
          계약서 스캔하기
        </button>

        <button
          onClick={handleUploadClick}
          className="w-full border border-green-200 text-green-200 rounded-lg py-4 text-base font-medium bg-white"
        >
          이미지 파일 업로드하기
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}

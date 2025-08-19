import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackHeader from "../../../../components/BackHeader";
import Button from "../../../../components/Button";

export default function DocUpload() {
  const nav = useNavigate();
  const { state } = useLocation();
  const { payload = {} } = state || {};

  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const openPicker = () => inputRef.current?.click();

  // PDF 타입만 확인 (용량 제한 없음)
  const validate = (f) => {
    if (!f) return "파일이 선택되지 않았습니다.";
    if (f.type !== "application/pdf") return "PDF 파일만 업로드 가능합니다.";
    return "";
  };

  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    const msg = validate(f);
    setError(msg);
    setFile(msg ? null : f);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    const msg = validate(f);
    setError(msg);
    setFile(msg ? null : f);
  };
  const onDragOver = (e) => e.preventDefault();

  const startAnalyze = () => {
    if (!file) {
      setError("PDF 파일을 업로드해 주세요.");
      return;
    }
    const nextPayload = {
      ...payload,
      doc: {
        name: file.name,
        type: file.type,
        file,
      },
    };
    nav("/explore/doc/analyze", { state: { payload: nextPayload } });
  };

  // ✅ CTA 상태 (파일 없으면 green-100, 있으면 green-200 hover:green-300)
  const ctaEnabled = !!file;
  const ctaClass = ctaEnabled
    ? "bg-green-200 hover:bg-green-300 text-white"
    : "bg-green-100 text-white cursor-not-allowed pointer-events-none";

  return (
    <div className="min-h-screen bg-white">
      <BackHeader title="" />

      <main className="px-1 pt-4 pb-28">
        <p className="text-sm text-green-200 mb-2">매물 위험도 분석</p>
        <p className="text-xl font-bold text-gray-900 mb-36">
          등기부등본 파일을 업로드해 주세요
        </p>

        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          className="rounded-xl p-4 text-center bg-gray-50"
        >
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={onFileChange}
          />

          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
              {file ? (
                <>
                  <span className="text-sm">📄</span>
                  <span className="truncate max-w-[220px]">{file.name}</span>
                  <span className="text-gray-500">업로드 완료</span>
                </>
              ) : (
                <span>pdf 파일을 업로드해 주세요.</span>
              )}
            </div>

            {/* 파일 선택 버튼: 항상 green-200 */}
            <Button
              onClick={openPicker}
              className="bg-green-200 text-sm text-white hover:bg-green-300 mobile-button w-[80px] h-9 flex items-center justify-center mx-auto"
            >
              파일 선택
            </Button>

            {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
          </div>
        </div>
      </main>

      {/* 하단 고정 바: 뒤로가기 + CTA (팝업 없음) */}
      <div className="fixed inset-x-0 bottom-4">
        <div className="mx-auto w-full max-w-[375px] px-5 flex items-center gap-3">
          {/* 뒤로가기 버튼 */}
          <button
            onClick={() => nav(-1)}
            aria-label="뒤로가기"
            className="w-14 h-14 rounded-xl bg-gray-200 flex items-center justify-center active:scale-95"
          >
            <img src="/icons/back.png" alt="뒤로가기" className="w-4 h-8" />
          </button>

          {/* CTA: 상태에 따라 색상/활성화 */}
          <Button
            onClick={startAnalyze}
            className={`flex-1 mobile-button ${ctaClass}`}
            disabled={!ctaEnabled}
          >
            정밀 안전도 분석 시작하기
          </Button>
        </div>
      </div>
    </div>
  );
}

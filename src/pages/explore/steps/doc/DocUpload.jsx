import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackHeader from "../../../../components/BackHeader";
import Button from "../../../../components/Button";

export default function DocUpload() {
  const nav = useNavigate();
  const { state } = useLocation();

  // 이전 단계에서 받아온 정보는 payload로만 다룸 (주소/가격 등)
  const { payload = {} } = state || {};

  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const openPicker = () => inputRef.current?.click();

  const validate = (f) => {
    if (!f) return "파일이 선택되지 않았습니다.";
    if (f.type !== "application/pdf") return "PDF 파일만 업로드 가능합니다.";
    // 10MB 제한(원하면 늘려도 됨)
    const MAX = 10 * 1024 * 1024;
    if (f.size > MAX) return "파일 용량은 10MB 이하여야 합니다.";
    return "";
  };

  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    const msg = validate(f);
    setError(msg);
    setFile(msg ? null : f);
  };

  // 드래그앤드롭
  const onDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    const msg = validate(f);
    setError(msg);
    setFile(msg ? null : f);
  };
  const onDragOver = (e) => e.preventDefault();

  const startAnalyze = () => {
    // 실제론 업로드 → 서버 URL을 받아오지만, 지금은 파일 자체를 state로 넘김
    if (!file) {
      setError("PDF 파일을 업로드해 주세요.");
      return;
    }

    const nextPayload = {
      ...payload,
      doc: {
        name: file.name,
        size: file.size,
        type: file.type,
        file, // 임시: 분석 페이지에서 직접 사용 (API 연동 전)
      },
    };

    nav("/explore/doc/analyze", { state: { payload: nextPayload } });
  };

  return (
    <div className="min-h-screen bg-white">
      <BackHeader title="" />

      <main className="px-1 pt-4 pb-28">
        <p className="text-xl font-bold text-gray-900 mb-6">
          등기부등본 파일을 업로드해 주세요
        </p>

        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          className="border-2 border-dashed rounded-xl p-6 text-center bg-gray-50"
        >
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={onFileChange}
          />

          <div className="space-y-3">
            <div className="text-4xl">📄</div>
            <p className="text-xs text-gray-600">
              PDF를 드롭하거나, 아래 버튼으로 선택하세요.
            </p>

            <Button onClick={openPicker} className="bg-green-200 text-white hover:bg-green-300 mobile-button w-full">
              파일 선택
            </Button>

            {file && (
              <div className="mt-3 text-sm text-gray-800">
                선택됨: <span className="font-medium">{file.name}</span>
              </div>
            )}
            {error && (
              <div className="mt-2 text-sm text-red-600">{error}</div>
            )}
          </div>
        </div>

        {/* 하단 고정 CTA와 겹치지 않게 여백 */}
        <div className="h-10" />

{/* 버튼 두가지 방법 고민, 1. 파일 아래 존재 , 2. 하단에 고정되어 스크롤해도 하단에서 볼 수 있도록 (cta방식) */}

        {/* 페이지 중간에도 시작 버튼 */}
        {/* <Button
          onClick={startAnalyze}
          className="w-full mobile-button mt-6 bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          위험도 분석 시작하기
        </Button> */}
      </main>

      {/* 하단 고정 CTA (시안처럼 하단에도 동일 버튼이 보이도록) */}
      <div className="fixed bottom-16 left-52 right-52 px-5">
        <Button
          onClick={startAnalyze}
          className="w-full mobile-button bg-green-200 text-white hover:bg-green-300"
        >
          위험도 분석 시작하기
        </Button>
      </div>
    </div>
  );
}

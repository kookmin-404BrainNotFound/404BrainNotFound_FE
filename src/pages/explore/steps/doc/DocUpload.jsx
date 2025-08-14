import { useNavigate } from "react-router-dom";

export default function DocUpload() {
  const nav = useNavigate();
  return (
    <div className="p-6 space-y-4">
      <div>안녕하세요 (등기부등본 업로드)</div>
      <div className="flex gap-2">
        <button className="mobile-button bg-gray-200" onClick={() => nav(-1)}>이전</button>
        <button className="mobile-button" onClick={() => nav("/explore/doc/method")}>다음</button>
      </div>
    </div>
  );
}

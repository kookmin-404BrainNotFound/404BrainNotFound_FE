import { useNavigate } from "react-router-dom";

export default function DocAnalyze() {
  const nav = useNavigate();
  return (
    <div className="p-6 space-y-4">
      <div className="w-72 text-center justify-start text-zinc-800 text-xl font-bold leading-2">
        AI가 매물의 적합도와 안전도를 <br />
        측정하고 있어요
      </div>{" "}
      <div className="flex gap-2">
        <button
          className="mobile-button bg-gray-200"
          onClick={() => nav("/explore/doc/method")}
        >
          이전
        </button>
        <button className="mobile-button" onClick={() => nav("/explore/final")}>
          다음
        </button>
      </div>
    </div>
  );
}

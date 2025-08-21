import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../components/BackButton";

export default function EtcStyle() {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const handleChange = (e) => {
    if (e.target.value.length <= 120) {
      setText(e.target.value);
    }
  };

  const handleNext = () => {
    if (!text.trim()) return;

    const saved = JSON.parse(localStorage.getItem("housingStyle") || "{}");
    localStorage.setItem(
      "housingStyle",
      JSON.stringify({ ...saved, etc: text.trim() })
    );

    navigate("/home/style/complete");
  };

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[420px] relative">
        <main className="px-5">
          <div className="flex flex-col items-start gap-3 mt-2">
            <img src="/icons/etc.png" className="w-10 h-10" alt="기타 아이콘" />

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Q5. 더 고려해야 할 요소가 있나요?
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                AI가 내용을 분석해 매물 적합도에 반영해요.
              </p>
            </div>
          </div>

          <div className="mt-10 relative">
            <textarea
              value={text}
              onChange={handleChange}
              placeholder="자유롭게 말씀해 주세요."
              className="w-full h-44 p-4 pr-14 rounded-xl text-sm text-gray-500
                         resize-none bg-[#F6FAF9] focus:outline-none "
            />
            <div
              className={`absolute bottom-5 right-4 text-xs ${
                text.length >= 120 ? "text-red-500" : "text-gray-500"
              }`}
            >
              {text.length}/120자
            </div>
          </div>
        </main>

        <div className="fixed left-0 right-0 bottom-0 flex justify-center">
          <div className="w-full max-w-[420px]">
            <div className="px-5 py-10 bg-white/90 border-gray-100">
              <div className="grid grid-cols-[56px_1fr] gap-2">
                <div>
                  <BackButton />
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!text.trim() || text.length > 120} // 버튼 막는 거 120자 넘어가는 건 적용 아직 안 됨
                  className={[
                    "py-4 font-medium rounded-xl text-base transition",
                    text.trim()
                      ? "bg-green-200 text-white hover:bg-emerald-800 active:bg-emerald-900"
                      : "bg-green-100 text-white/80 cursor-not-allowed",
                  ].join(" ")}
                >
                  입력 완료
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../components/BackButton";

const OPTIONS = [
  "많이 민감해요. 주변이 조용해야만 해요.",
  "조금 민감해요. 조용한 지역이었으면 좋겠어요.",
  "상관없지만 굳이 따지면 조용한 게 더 좋아요.",
  "아무 신경 안 써요.",
];

export default function NoiseStyle() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleNext = () => {
    if (selected === null) return;

    const saved = JSON.parse(localStorage.getItem("housingStyle") || "{}");
    localStorage.setItem(
      "housingStyle",
      JSON.stringify({ ...saved, noise: OPTIONS[selected] })
    );

    navigate("/home/style/sunlight");
  };

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[420px] relative">
        <main className="px-5">
          <div className="flex flex-col items-start gap-3 mt-2">
            <img src="/icons/noise.png" className="w-10 h-13 mt-2" />

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Q1. 소음에 얼마나 민감하신가요?
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                매물 주변 소음도를 고려해 적합도를 계산해요.
              </p>
            </div>
          </div>

          {/* 옵션 리스트 */}
          <ul className="mt-16 space-y-3">
            {OPTIONS.map((label, idx) => {
              const active = selected === idx;
              return (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => setSelected(idx)}
                    className={[
                      "w-full text-left rounded-2xl px-4 py-4 transition border",
                      active
                        ? "bg-[#F6FAF9] border-green-200"
                        : "bg-[#F6FAF9] border-transparent hover:bg-gray-100",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "text-medium leading-6",
                        active ? "text-green-300" : "text-green-300",
                      ].join(" ")}
                    >
                      {label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
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
                  disabled={selected === null}
                  className={[
                    "py-4 font-medium rounded-xl text-base transition",
                    selected !== null
                      ? "bg-green-200 text-white hover:bg-emerald-800 active:bg-emerald-900"
                      : "bg-green-100 text-white/80 cursor-not-allowed",
                  ].join(" ")}
                >
                  다음
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

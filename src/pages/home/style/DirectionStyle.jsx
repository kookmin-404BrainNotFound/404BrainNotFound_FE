import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../components/BackButton";

const OPTIONS = [
  "남향: 채광 시간이 길지만 결로를 주의해야 해요.",
  "북향: 여름에 시원하지만 겨울에는 추워요.",
  "동향: 아침 햇살이 잘 들지만 오후에는 서늘해요.",
  "서향: 늦은 오후에 해가 잘 들지만 여름에 더워요.",
  "아무 신경 안 써요.",
];

export default function DirectionStyle() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleNext = () => {
    if (selected === null) return;

    const saved = JSON.parse(localStorage.getItem("housingStyle") || "{}");
    localStorage.setItem(
      "housingStyle",
      JSON.stringify({ ...saved, direction: OPTIONS[selected] })
    );

    navigate("/home/style/etc");
  };

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[420px] relative">
        <main className="px-5">
          <div className="flex flex-col items-start gap-3 mt-2">
            <img src="/icons/direction.png" className="w-10 h-13 mt-2" />

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Q4. 선호하는 집 방향이 있나요?{" "}
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                매물의 방향을 고려해 적합도를 계산해요.{" "}
              </p>
            </div>
          </div>

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

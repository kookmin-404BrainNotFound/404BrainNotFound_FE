// src/pages/DealForm.jsx
import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DEAL_TYPES = ["월세", "전세", "반전세", "미정"];

export default function DealForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const address = state?.address || ""; // 이전 화면에서 받은 주소

  const [dealType, setDealType] = useState("월세");
  const [deposit, setDeposit] = useState(""); // 보증금(만원)
  const [monthly, setMonthly] = useState(""); // 월세(만원)

  // 전세/미정일 땐 월세 입력 숨기기 (반전세는 표시)
  const showMonthly = useMemo(
    () => dealType === "월세" || dealType === "반전세",
    [dealType]
  );

  const onSubmit = () => {
    // 간단 검증
    if (!address)
      return alert("주소 정보가 없습니다. 뒤로 가서 주소를 입력해 주세요.");
    if (!dealType) return alert("거래 형태를 선택해 주세요.");
    if (!deposit) return alert("보증금을 입력해 주세요.");
    if (showMonthly && !monthly) return alert("월세를 입력해 주세요.");

    // 다음 단계로 넘길 데이터 예시
    const payload = {
      address,
      dealType,
      deposit: Number(deposit),
      monthly: showMonthly ? Number(monthly) : 0,
    };
    navigate("/explore/doc/intro", { state: payload });

    // 실제로는 분석 페이지로 이동하거나 API 호출
    // navigate("/explore/review", { state: payload });
    alert("입력 완료! (다음 단계로 연결하세요)");
  };

  return (
    <>
      <div className="mx-auto max-w-md flex flex-col">
        {/* 상단 패널 */}
        <section className="bg-white rounded-b-3xl pt-3 pb-6">
          <img
            src="/icons/minihome.png"
            alt="미니홈"
            className="w-9 h-12 rounded-md mb-4"
          />{" "}
          <h1 className="text-2xl font-semibold leading-snug">
            매물의 거래 형태와 보증금을
          </h1>
          <h1 className="text-2xl font-semibold leading-snug">입력해 주세요</h1>
          <p className="text-gray-500 font-extralight text-sm mt-2.5">
            거래 형태와 금액에 따라 위험도가 달라지기도 해요.
          </p>
          {/* 주소 표시 (읽기 전용) */}
          <div className="mt-4">
            <div className="flex items-center w-full rounded-lg border border-green-200 mt-10 px-4 py-3 bg-white/70">
              <input
                className="w-full text-sm text-green-200 text-center outline-none border-none bg-transparent"
                readOnly
                value={address || "주소 없음"}
              />
            </div>
          </div>
          {/* 거래 형태 토글 */}
          <div className="mt-6 grid grid-cols-4 gap-2">
            {DEAL_TYPES.map((t) => {
              const active = dealType === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setDealType(t)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition
          ${
            active
              ? "bg-gray-700 text-white shadow-sm"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </section>

        {/* 입력 카드 */}
        <section className=" ">
          {/* 보증금 */}
          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3">
            <span className="text-sm text-gray-700">보증금</span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-24 text-right text-sm bg-transparent outline-none"
                placeholder="0"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value.replace(/\D/g, ""))}
              />
              <span className="text-sm text-gray-500">만 원</span>
            </div>
          </div>

          {/* 월세 (조건부) */}
          {showMonthly && (
            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 mt-1">
              <span className="text-sm text-gray-700">월세</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="w-24 text-right text-sm bg-transparent outline-none"
                  placeholder="0"
                  value={monthly}
                  onChange={(e) =>
                    setMonthly(e.target.value.replace(/\D/g, ""))
                  }
                />
                <span className="text-sm text-gray-500">만 원</span>
              </div>
            </div>
          )}
        </section>

        <div
          className="mt-auto "
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="flex mt-auto items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="뒤로"
              className="h-14 w-14 rounded-lg  bg-gray-200
                 text-gray-700 flex items-center justify-center
                 shadow-sm hover:bg-gray-400 active:translate-y-[1px] transition"
            >
              <span className="text-2xl leading-none">←</span>
            </button>

            <button
              onClick={onSubmit}
              className="flex-1 h-14 rounded-lg bg-gray-300 text-gray-900 font-semibold
                 hover:bg-gray-400 transition-colors shadow-sm"
            >
              AI 분석받기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

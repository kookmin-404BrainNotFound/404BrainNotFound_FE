// src/pages/DealForm.jsx
import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import BackButton from "../../components/BackButton";

const DEAL_TYPES = ["월세", "전세", "반전세", "미정"];

export default function DealForm() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const baseAddress = state?.address || "";   // 기본 주소
  const detail = state?.detail || "";         // 상세 주소
  const address = detail ? `${baseAddress} ${detail}` : baseAddress; // ✅ 합쳐진 주소

  const [dealType, setDealType] = useState("월세");
  const [deposit, setDeposit] = useState(""); // 보증금(만원)
  const [monthly, setMonthly] = useState(""); // 월세(만원)

  // 전세/미정일 땐 월세 입력 숨기기 (반전세는 표시)
  const showMonthly = useMemo(
    () => dealType === "월세" || dealType === "반전세",
    [dealType]
  );

  const showDeposit = useMemo(
    () => dealType === "월세" || dealType === "전세" || dealType === "반전세",
    [dealType]
  );

  const isFormReady =
    (!showDeposit || Number(deposit) > 0) &&
    (!showMonthly || Number(monthly) > 0);

  const onSubmit = () => {
    if (!dealType) return alert("거래 형태를 선택해 주세요.");
    if (showDeposit && !deposit) return alert("보증금을 입력해 주세요.");
    if (showMonthly && !monthly) return alert("월세를 입력해 주세요.");

    const payload = {
      address, // ✅ 합쳐진 주소를 그대로 넘김
      dealType,
      deposit: showDeposit ? Number(deposit) : 0,
      monthly: showMonthly ? Number(monthly) : 0,
    };

    navigate("/explore/doc/analyze", { state: payload });
  };

  return (
    <>
      <div className="mx-auto max-w-md flex flex-col">
        <section className="bg-white rounded-b-3xl pt-3 pb-6">
          <img src="/icons/minihome.png" className="w-9 h-12 rounded-md mb-4" />{" "}
          <h1 className="text-2xl font-semibold leading-snug">
            매물의 거래 형태와 보증금을
          </h1>
          <h1 className="text-2xl font-semibold leading-snug">입력해 주세요</h1>
          <p className="text-gray-500 font-extralight text-sm mt-2.5">
            거래 형태와 금액에 따라 위험도가 달라지기도 해요.
          </p>
          <div className="mt-4">
            <div className="flex items-center w-full rounded-lg border border-green-200 border-mt-10 px-4 py-[12px] bg-white/70">
              <input
                className="w-full text-sm text-green-200 text-center outline-none border-none bg-transparent"
                readOnly
                value={address || "주소 없음"}   // ✅ 합쳐진 주소 표시
              />
            </div>
          </div>
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
              ? "bg-green-200 text-white shadow-sm"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </section>

        <section className=" ">
          {/* 보증금 */}
          {showDeposit && (
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2">
              <span className="text-sm text-gray-700">보증금</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="w-24 text-right text-sm bg-transparent outline-none"
                  placeholder="0"
                  value={deposit}
                  onChange={(e) =>
                    setDeposit(e.target.value.replace(/\D/g, ""))
                  }
                />
                <span className="text-sm text-gray-500">만 원</span>
              </div>
            </div>
          )}

          {/* 월세 (조건부) */}
          {showMonthly && (
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2 mt-1">
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

        <div className="flex mt-auto fixed bottom-24 left-4 right-4 items-center gap-3">
          <div>
            <BackButton />
          </div>

          <Button
            onClick={onSubmit}
            disabled={!isFormReady}
            className="flex-1 h-14"
          >
            다음
          </Button>
        </div>
      </div>
    </>
  );
}

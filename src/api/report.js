// 전월세 저장 (보증금, 월세)
export const saveUserPrice = async (
  reportId,
  { security_deposit, monthly_rent, is_year_rent = false }
) => {
  try {
    const query = new URLSearchParams({
      security_deposit,
      monthly_rent,
      is_year_rent,
    });

    const res = await fetch(
      `/api/report/${reportId}/saveUserPrice/?${query.toString()}`,
      {
        method: "POST",
        headers: { accept: "application/json" },
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      throw new Error("saveUserPrice 실패: " + errText);
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// 전월세 평균가 계산 API
export const makeAvgPrice = async (reportId, start_year = 2024) => {
  try {
    const query = new URLSearchParams({ start_year });

    const res = await fetch(
      `/api/report/${reportId}/makeAvgPrice/?${query.toString()}`,
      {
        method: "POST",
        headers: { accept: "application/json" },
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      throw new Error("makeAvgPrice 실패: " + errText);
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// 건축물대장 저장 API
export const makeBuildingInfo = async (reportId) => {
  try {
    const res = await fetch(`/api/report/${reportId}/makeBuildingInfo/`, {
      method: "POST",
      headers: { accept: "application/json" },
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error("makeBuildingInfo 실패: " + errText);
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// 최종 보고서 생성 API
export const makeReport = async (reportId) => {
  try {
    const res = await fetch(`/api/report/${reportId}/makeReport/`, {
      method: "POST",
      headers: { accept: "application/json" },
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error("makeReport 실패: " + errText);
    }

    return await res.json(); // 최종 보고서 데이터 반환
  } catch (err) {
    console.error(err);
    throw err;
  }
};

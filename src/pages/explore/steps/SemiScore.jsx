import { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../../../components/PageHeader";
import { makeReport } from "../../../api/report";

function ScaledViewport({ children, width = 375, height = 812 }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const s = Math.min(vw / width, vh / height);
      setScale(s);
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, [width, height]);

  return (
    <div>
      <PageHeader title="매물 분석 리포트" />
      <div className="fixed inset-0 bg-white">
        <div
          className="relative shadow-2xl rounded-[18px]"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
          {/* 내부만 세로 스크롤 허용 */}
          <div className="w-full h-full overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}

// ✅ 점수 카드 공통 컴포넌트
function ScoreBox({ label, score, color }) {
  return (
    <div className="bg-white rounded-xl shadow-[0px_0px_15px_rgba(69,128,119,0.29)] py-6 flex flex-col items-center w-32">
      <p className="text-zinc-800 text-base font-semibold mb-3">{label}</p>
      <div className="w-24 border-b border-zinc-400 mb-4"></div>
      <p className="text-4xl font-bold" style={{ color: color }}>
        {score}점
      </p>
    </div>
  );
}

export default function SemiScore() {
  const nav = useNavigate();
  const { state } = useLocation();
  const search = new URLSearchParams(location.search);

  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const reportId = state?.reportId;
        if (!reportId) {
          console.warn("⚠️ reportId 없음");
          return;
        }

        const data = await makeReport(reportId);
        console.log("📊 최종 보고서:", data);
        setReportData(data);
      } catch (err) {
        console.error("❌ 보고서 불러오기 실패:", err);
      }
    };

    fetchReport();
  }, [state]);

  // 주소/보증금/월세 복원
  const initial = useMemo(() => {
    const fromState = state || {};
    const fromQuery = {
      address: search.get("address"),
      deposit: search.get("deposit"),
      rent: search.get("monthly"),
    };
    const saved = JSON.parse(localStorage.getItem("explore_form") || "{}");

    return {
      address:
        fromState?.address ||
        fromQuery.address ||
        saved.address ||
        "서울시 멋쟁이구 사자로 4",
      deposit:
        fromState?.deposit || fromQuery.deposit || saved.deposit || "5,000만원",
      rent: fromState?.rent || fromQuery.rent || saved.rent || "60만원",
    };
  }, [state, search]);

  // 임시 점수
  const [score, setScore] = useState(null);
  useEffect(() => {
    const t = setTimeout(() => setScore(88), 500);
    return () => clearTimeout(t);
  }, []);

  const [tab, setTab] = useState("fit"); // fit | risk

  return (
    <ScaledViewport>
      <div className="flex flex-col w-full h-full">
        <main className="px- py-4 pb-28">
          {/* 상단 헤더 + 점수 섹션 */}
          <div className="-mx-5 px-6 py-8 mt-8 bg-gradient-to-br from-[#F6FAF9] to-[#D4EDEA]">
            <div className="flex justify-center mb-4">
              <span className="inline-block px-4 py-1 text-sm font-medium text-[#107868] bg-white rounded-full shadow-sm">
                {initial.address} 102호
              </span>
            </div>

            <h2 className="text-center text-2xl font-bold mb-2">
              살기 좋은 집이네요!
            </h2>
            <p className="w-80 mx-auto text-center text-zinc-500 text-xs font-medium leading-relaxed tracking-tight mb-9">
              든든집 AI가 이 매물이 얼마나 적합한지,
              <br />
              주의해야 할 위험 요소는 무엇이 있는지 분석했어요.
            </p>

            {/* ✅ ScoreBox로 관리 */}
            <div className="flex justify-center gap-6">
              <ScoreBox label="적합도 점수" score={78} color="#FFBB2A" />
              <ScoreBox label="안전도 점수" score={82} color="#0063F8" />
            </div>
          </div>

          {/* 탭 스위치 */}
          <div className="grid grid-cols-2 mb-3">
            <button
              onClick={() => setTab("fit")}
              className={
                "w-full py-3 text-base font-semibold " +
                (tab === "fit"
                  ? "border-b-2 border-green-200 text-green-200"
                  : "border-b-2 border-transparent text-gray-500")
              }
            >
              적합도 분석
            </button>
            <button
              onClick={() => setTab("risk")}
              className={
                "w-full py-3 text-base font-semibold " +
                (tab === "risk"
                  ? "border-b-2 border-green-200 text-green-200"
                  : "border-b-2 border-transparent text-gray-500")
              }
            >
              안전도 분석
            </button>
          </div>

          {/* 탭 콘텐츠 */}
          <div className="flex-1 bg-gray-100">
            {tab === "fit" ? (
              <FitContent
                score={score}
                deposit={initial.deposit}
                rent={initial.rent}
              />
            ) : (
              <RiskContent />
            )}
          </div>

        </main>
      </div>
    </ScaledViewport>
  );
}

// ✅ 이하 콘텐츠 컴포넌트 (FitContent / RiskContent)
function FitContent() {
  return (
    <section className="px-5 space-y-3 pt-1">
      {/* 빠르게 보는 종합 결론 */}
      <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white mt-4 rounded-xl  p-4">
        <h3 className="font-semibold mb-3">빠르게 보는 종합 결론</h3>
        <div className="bg-[#EAF2F1] text-green-200 text-center font-bold px-3 py-2 rounded-lg mb-3">
          다원님의 성향과 매물이 전반적으로 부합
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">
          다원님의 성향
          <span className="text-[#107868] font-semibold">(조용함, 서울함, 아늑함 등)</span>
          과 매물 특성
          <span className="text-[#176E4B] font-semibold">(방음, 통풍 가능성, 고층 신축, 쾌적한 공기질)</span>
          이 전반적으로 부합해요.
        </p>

        <p className="text-sm text-gray-700 leading-relaxed mt-2">
          등기부등본, 건축물대장, 공기질 등 모든 자료가 누락 없이 제공되어 신뢰할 수 있어요.
        </p>

        <p className="text-sm text-gray-700 leading-relaxed mt-2">
          단,
          <span className="text-green-200 font-semibold"> 직사광선, 실제 소음, 방향 </span>
          등은 반드시 현장 방문을 통해 최종 확인해 주세요.
        </p>
      </div>

      {/* 보증금 및 시세 분석 */}
      <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl   p-5">
        <div className="flex items-center mb-4">
          <h3 className="font-semibold mb-3">사용자 성향 분석</h3>
          <span className="mx-2 mb-3 px-2 py-1 text-xs font-bold text-white bg-[#2A83FF] rounded-md">
            안전
          </span>
        </div>

        <div className="flex justify-between items-center mb-5">
              <img
                src="/icons/alltypeicons.png"
                alt="성향 아이콘"
                className=""
              />
          <div className="w-4" />
        </div>

        <p className="text-sm text-gray-700 mb-3 leading-relaxed">
        다원님은 소음에 매우 민감하고 조용한 환경, 직사광선 없이 서늘한 집, 평균 천장 높이, 북향 선호, 아늑함을 원한다고 응답했어요.
        </p>


      </div>

      <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl   p-5">
        <div className="flex items-center mb-4">
          <h3 className="font-semibold mb-3">건축물 및 위치 특성</h3>
          <span className="mx-2 mb-3 px-2 py-1 text-xs font-bold text-white bg-[#2A83FF] rounded-md">
            안전
          </span>
        </div>

        <div className="flex items-start gap-4 mb-4">
          <img
            src="/icons/building.png"
            alt="건축물 아이콘"
            className="w-16 h-16"
          />

          <div className="flex flex-col text-sm text-gray-700">
            <p>
              <span className=" mr-2">주 용도</span>
              업무시설(주거용 오피스텔)
            </p>
            <p>
              <span className=" mr-2">준공년도</span>
              2020년
            </p>
            <p>
              <span className=" mr-2">특성</span>총 14층, 지하 1층,
              1동 <br /> 
            </p>
            <p className="ml-[34px]">콘크리트 구조, 방음성능 양호</p>
          </div>
        </div>
    <section className="space-y-4 px-5">
      {/* 체크 아이콘 리스트 */}
      <ul className="space-y-3">
        <li className="flex items-start gap-2">
          <img src="/icons/greencheck.png" alt="체크" className="w-5 h-5 mt-0.5" />
          <p className="text-sm text-gray-700">
            오피스텔 특성상 인접 세대 소음은 입주 전 직접 확인이 필요해요.
          </p>
        </li>
        <li className="flex items-start gap-2">
          <img src="/icons/greencheck.png" alt="체크" className="w-5 h-5 mt-0.5" />
          <p className="text-sm text-gray-700">
            북향이 아니라면 채광이나 온도 등에서 만족도가 떨어질 수 있어요.
          </p>
        </li>
        <li className="flex items-start gap-2">
          <img src="/icons/greencheck.png" alt="체크" className="w-5 h-5 mt-0.5" />
          <p className="text-sm text-gray-700">
            천장 높이는 오피스텔 표준(2.3~2.4m 내외)으로 예상되며, 평균 수준일 가능성이 높아요.
          </p>
        </li>
      </ul>

      {/* 힌트 박스 */}
      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 flex items-start gap-2">
        <span className="text-lg">💡</span>
        <div className="space-y-2">
          <p>
            오피스텔은 주거용이지만 업무시설로 분류되어 일부 세금이나 관리 규정에서 차이가 있을 수 있어요.
          </p>
          <p>
            입주 전 관리사무소에서{" "}
            <span className="font-semibold text-gray-800">실제 거주자 비율</span>,
            <span className="font-semibold text-gray-800"> 관리비 내역</span>,
            <span className="font-semibold text-gray-800"> 입주민 특성</span>을 문의해 보시는 게 좋아요.
          </p>
        </div>
      </div>
    </section>
      </div>

      <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl   p-5 space-y-6">
        {/* 제목 */}
        <h3 className="font-bold text-lg mb-2">공기질 및 환경</h3>
        {/* 소유권 */}
        <div>
          <div className="flex items-center mb-2">
            <h4 className="font-semibold">소유권</h4>
            <span className="ml-2 px-2 py-1 text-xs font-bold text-white bg-[#2A83FF] rounded-md">
              안전
            </span>
          </div>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-start">
              <img
                src="/icons/greencheck.png"
                alt="체크 아이콘"
                className="w-4 h-4 mr-2 mt-1"
              />
              <span>
                최초 소유자(법인)에서 현재 소유자(개인, 김수아)로{" "}
                <span className="text-green-200 font-semibold">
                  정상적인 소유권 이전
                </span>
                이 이루어졌어요.
              </span>
            </li>

            <li className="flex items-start">
              <img
                src="/icons/greencheck.png"
                alt="체크 아이콘"
                className="w-4 h-4 mr-2 mt-1"
              />
              <span>거래가격은 2억 4,900만원으로 보증금과 유사해요.</span>
            </li>

            <li className="flex items-start">
              <img
                src="/icons/greencheck.png"
                alt="체크 아이콘"
                className="w-4 h-4 mr-2 mt-1"
              />
              <span>
                실거래가에 근거한 보증금 설정이라면{" "}
                <span className="text-green-200 font-semibold">
                  안전성이 높아요.
                </span>
              </span>
            </li>
          </ul>
        </div>
        <div className="w-full border-b border-gray-300 mb-4"></div>
        {/* 근저당/담보 */}
        <div className="mt-6">
          <div className="flex items-center mb-2">
            <h4 className="font-semibold">근저당/담보</h4>
            <span className="ml-2 px-2 py-1 text-xs font-bold text-white bg-[#2A83FF] rounded-md">
              안전
            </span>
          </div>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-start">
              <img
                src="/icons/greencheck.png"
                alt="체크 아이콘"
                className="w-4 h-4 mr-2 mt-1"
              />
              <span>
                과거에 높은 채권최고액(36억원)의 근저당이 있었으나, 2021년 9월
                14일{" "}
                <span className="text-green-200 font-semibold">
                  해지 및 말소
                </span>
                되었어요.
              </span>
            </li>

            <li className="flex items-start">
              <img
                src="/icons/greencheck.png"
                alt="체크 아이콘"
                className="w-4 h-4 mr-2 mt-1"
              />
              <span>
                현재 근저당권, 전세권, 가압류 등{" "}
                <span className="text-green-200 font-semibold">
                  권리침해 요소가 남아 있지 않아요.
                </span>
              </span>
            </li>

            <li className="flex items-start">
              <img
                src="/icons/greencheck.png"
                alt="체크 아이콘"
                className="w-4 h-4 mr-2 mt-1"
              />
              <span>
                말소된 기록이 많지만 모든 권리가 정상적으로 소멸 처리되었어요.
              </span>
            </li>
          </ul>
        </div>
        <hr className="my-4 border-gray-200" />
        {/* 기타 권리사항 */}
        <div className="mt-4">
          <div className="flex items-center mb-2">
            <h4 className="font-semibold">기타 권리사항</h4>
            <span className="ml-2 px-2 py-1 text-xs font-bold text-white bg-[#2A83FF] rounded-md">
              안전
            </span>
          </div>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-start">
              <img
                src="/icons/greencheck.png"
                alt="체크 아이콘"
                className="w-4 h-4 mr-2 mt-1"
              />
              <span>을구(소유권 이외의 권리): 기록사항 없음</span>
            </li>
            <li className="flex items-start">
              <img
                src="/icons/greencheck.png"
                alt="체크 아이콘"
                className="w-4 h-4 mr-2 mt-1"
              />
              <span>갑구(소유권): 단독 소유, 지분 문제 없음</span>
            </li>
          </ul>
        </div>{" "}
      </div>
      <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl   p-5">
        <div className="flex items-center mb-4">
          <h3 className="font-semibold">위험요소 종합 평가</h3>
          <span className="ml-2 px-2 py-1 text-xs font-bold text-white bg-[#2A83FF] rounded-md">
            안전
          </span>
        </div>

        <p className="text-green-200 font-bold text-center mb-4">
          전세사기 주요 위험 신호 없음
        </p>

        <div className="flex justify-center mb-4">
          <img
            src="/icons/housecheck.png"
            alt="집 아이콘"
            className="w-20 h-20"
          />
        </div>

        {/* 리스트 */}
        <ul className="text-sm text-gray-700 space-y-2 mb-5">
          <li className="flex items-start">
            <img
              src="/icons/greencheck.png"
              alt="체크"
              className="w-4 h-4 mr-2 mt-1"
            />
            <span>보증금이 시세 대비 극단적으로 높지 않아요.</span>
          </li>
          <li className="flex items-start">
            <img
              src="/icons/greencheck.png"
              alt="체크"
              className="w-4 h-4 mr-2 mt-1"
            />
            <span>최근 거래 및 등기변동이 과도하게 많지 않아요.</span>
          </li>
          <li className="flex items-start">
            <img
              src="/icons/greencheck.png"
              alt="체크"
              className="w-4 h-4 mr-2 mt-1"
            />
            <span>근저당 등 권리침해 요소가 전부 말소되었어요.</span>
          </li>
          <li className="flex items-start">
            <img
              src="/icons/greencheck.png"
              alt="체크"
              className="w-4 h-4 mr-2 mt-1"
            />
            <span>등기부상 소유권, 채권, 기타 권리 상태 모두 양호해요.</span>
          </li>
        </ul>

        {/* 하단 안내 박스 */}
        <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
          <p className="mb-2">
            💡 신축 오피스텔 특성상 다수 임차인이 유사 조건으로 입주하기 때문에
            보증금 반환에 있어 집단 리스크가 발생할 수 있지만, 소유주가 다수로
            분산되어 있다면 위험이 낮아요.
          </p>
          <p>
            본 건은 개인 소유 단일 호실이기 때문에 해당 리스크도 제한적이에요.
          </p>
        </div>
      </div>
    </section>
  );
}

function RiskContent() {
  return (
    <section className="px-5 space-y-3 pt-1">
      {/* 빠르게 보는 종합 결론 */}
      <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white mt-4 rounded-xl   p-4">
        <h3 className="font-semibold mb-3">빠르게 보는 종합 결론</h3>
        <div className="bg-[#EAF2F1] text-green-200 text-center font-bold px-3 py-2 rounded-lg mb-3">
          전세사기(깡통전세) 위험도 낮은 편
        </div>
        <p className="text-sm text-gray-600">
          보증금 반환 리스크, 근저당/가압류 등 권리침해 리스크, 불법 건축 위험,
          시세 괴리 등 전세사기의 주요 위험 신호가 발견되지 않았어요.
        </p>

        <p className="mt-1 text-sm text-gray-600">
          등기부등본이 최신 상태로 제공되어 누락, 위조 의심도 <br />
          없어요.
        </p>

        <p className="mt-1 text-sm text-gray-600">
          단, 오피스텔 시장 특성상 향후 시세 하락 시 보증금 회수가 어려워질 수
          있으므로, 전세보증금 반환보증 가입을 권고해요.{" "}
        </p>
      </div>

      {/* 보증금 및 시세 분석 */}
      <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl   p-5">
        <div className="flex items-center mb-4">
          <h3 className="font-semibold mb-3">보증금 및 시세 분석</h3>
          <span className="mx-2 mb-3 px-2 py-1 text-xs font-bold text-white bg-[#2A83FF] rounded-md">
            안전
          </span>
        </div>

        <div className="flex justify-between items-center mb-5">
          <div className="text-center flex-1">
            <div className="bg-green-200  text-white px-4 py-2 rounded-lg font-bold w-20 mx-auto">
              24,000만원
            </div>
            <p className="text-xs font-bold text-green-200 mt-1">
              사용자 보증금
            </p>
          </div>
          <div className="w-4" />

          <div className="text-center flex-1">
            <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold w-20 mx-auto">
              22,433만원
            </div>
            <p className="text-xs font-bold text-gray-500 mt-1">
              단지 평균 보증금
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-700 mb-3 leading-relaxed">
          다원님의 보증금은 단지 평균 시세와 비교했을 때 약간 높지만, 극단적으로
          과도한 수준은 아니에요.
          <br />본 건은 평균 대비 약 7% 정도 높아 상대적으로{" "}
          <span className="font-semibold text-emerald-700">안정적인 수치</span>
          예요.
        </p>

        <div className="bg-[#F6FAF9] rounded-lg p-3 text-sm text-gray-600 flex items-start gap-2">
          <span className="text-lg">💡</span>
          <p>
            최근 전세 사기 유형에서 평균 대비 10~20% 이상 높은 보증금이
            반복적으로 등장하는 경우 주의가 필요해요.
          </p>
        </div>
      </div>

      <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl   p-5">
        <div className="flex items-center mb-4">
          <h3 className="font-semibold mb-3">건축물대장 분석</h3>
          <span className="mx-2 mb-3 px-2 py-1 text-xs font-bold text-white bg-[#2A83FF] rounded-md">
            안전
          </span>
        </div>

        <div className="flex items-start gap-4 mb-4">
          <img
            src="/icons/building.png"
            alt="건축물 아이콘"
            className="w-20 h-20"
          />

          <div className="flex flex-col text-sm text-gray-700">
            <p>
              <span className=" mr-2">주 용도</span>
              업무시설(주거용 오피스텔)
            </p>
            <p>
              <span className=" mr-2">준공년도</span>
              2020년
            </p>
            <p>
              <span className=" mr-2">특성</span>총 14층, 지하 1층,
              1동
            </p>
            <p className="ml-[52px]">내진설계 적용, 구조적 특이사항 없음</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          건축물 대장상 문제점이나 불법 용도변경, 불법 증축 등은 확인되지
          않았어요.
        </p>
      </div>

      <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl   p-5 space-y-6">
        {/* 제목 */}
        <h3 className="font-bold text-lg mb-2">등기부등본 상세 분석</h3>
        {/* 소유권 */}
        <div>
          <div className="flex items-center mb-2">
            <h4 className="font-semibold">소유권</h4>
            <span className="ml-2 px-2 py-1 text-xs font-bold text-white bg-[#2A83FF] rounded-md">
              안전
            </span>
          </div>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-start">
              <img
                src="/icons/greencheck.png"
                alt="체크 아이콘"
                className="w-4 h-4 mr-2 mt-1"
              />
              <span>
                최초 소유자(법인)에서 현재 소유자(개인, 김수아)로{" "}
                <span className="text-green-200 font-semibold">
                  정상적인 소유권 이전
                </span>
                이 이루어졌어요.
              </span>
            </li>

            <li className="flex items-start">
              <img
                src="/icons/greencheck.png"
                alt="체크 아이콘"
                className="w-4 h-4 mr-2 mt-1"
              />
              <span>거래가격은 2억 4,900만원으로 보증금과 유사해요.</span>
            </li>

            <li className="flex items-start">
              <img
                src="/icons/greencheck.png"
                alt="체크 아이콘"
                className="w-4 h-4 mr-2 mt-1"
              />
              <span>
                실거래가에 근거한 보증금 설정이라면{" "}
                <span className="text-green-200 font-semibold">
                  안전성이 높아요.
                </span>
              </span>
            </li>
          </ul>
        </div>
        <div className="w-full border-b border-gray-300 mb-4"></div>
        {/* 근저당/담보 */}
        <div className="mt-6">
          <div className="flex items-center mb-2">
            <h4 className="font-semibold">근저당/담보</h4>
            <span className="ml-2 px-2 py-1 text-xs font-bold text-white bg-[#2A83FF] rounded-md">
              안전
            </span>
          </div>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-start">
              <img
                src="/icons/greencheck.png"
                alt="체크 아이콘"
                className="w-4 h-4 mr-2 mt-1"
              />
              <span>
                과거에 높은 채권최고액(36억원)의 근저당이 있었으나, 2021년 9월
                14일{" "}
                <span className="text-green-200 font-semibold">
                  해지 및 말소
                </span>
                되었어요.
              </span>
            </li>

            <li className="flex items-start">
              <img
                src="/icons/greencheck.png"
                alt="체크 아이콘"
                className="w-4 h-4 mr-2 mt-1"
              />
              <span>
                현재 근저당권, 전세권, 가압류 등{" "}
                <span className="text-green-200 font-semibold">
                  권리침해 요소가 남아 있지 않아요.
                </span>
              </span>
            </li>

            <li className="flex items-start">
              <img
                src="/icons/greencheck.png"
                alt="체크 아이콘"
                className="w-4 h-4 mr-2 mt-1"
              />
              <span>
                말소된 기록이 많지만 모든 권리가 정상적으로 소멸 처리되었어요.
              </span>
            </li>
          </ul>
        </div>
        <hr className="my-4 border-gray-200" />
        {/* 기타 권리사항 */}
        <div className="mt-4">
          <div className="flex items-center mb-2">
            <h4 className="font-semibold">기타 권리사항</h4>
            <span className="ml-2 px-2 py-1 text-xs font-bold text-white bg-[#2A83FF] rounded-md">
              안전
            </span>
          </div>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-start">
              <img
                src="/icons/greencheck.png"
                alt="체크 아이콘"
                className="w-4 h-4 mr-2 mt-1"
              />
              <span>을구(소유권 이외의 권리): 기록사항 없음</span>
            </li>
            <li className="flex items-start">
              <img
                src="/icons/greencheck.png"
                alt="체크 아이콘"
                className="w-4 h-4 mr-2 mt-1"
              />
              <span>갑구(소유권): 단독 소유, 지분 문제 없음</span>
            </li>
          </ul>
        </div>{" "}
      </div>
      <div className="shadow-[0px_0px_10px_2px_rgba(0,0,0,0.07)] bg-white rounded-xl   p-5">
        <div className="flex items-center mb-4">
          <h3 className="font-semibold">위험요소 종합 평가</h3>
          <span className="ml-2 px-2 py-1 text-xs font-bold text-white bg-[#2A83FF] rounded-md">
            안전
          </span>
        </div>

        <p className="text-green-200 font-bold text-center mb-4">
          전세사기 주요 위험 신호 없음
        </p>

        <div className="flex justify-center mb-4">
          <img
            src="/icons/housecheck.png"
            alt="집 아이콘"
            className="w-20 h-20"
          />
        </div>

        {/* 리스트 */}
        <ul className="text-sm text-gray-700 space-y-2 mb-5">
          <li className="flex items-start">
            <img
              src="/icons/greencheck.png"
              alt="체크"
              className="w-4 h-4 mr-2 mt-1"
            />
            <span>보증금이 시세 대비 극단적으로 높지 않아요.</span>
          </li>
          <li className="flex items-start">
            <img
              src="/icons/greencheck.png"
              alt="체크"
              className="w-4 h-4 mr-2 mt-1"
            />
            <span>최근 거래 및 등기변동이 과도하게 많지 않아요.</span>
          </li>
          <li className="flex items-start">
            <img
              src="/icons/greencheck.png"
              alt="체크"
              className="w-4 h-4 mr-2 mt-1"
            />
            <span>근저당 등 권리침해 요소가 전부 말소되었어요.</span>
          </li>
          <li className="flex items-start">
            <img
              src="/icons/greencheck.png"
              alt="체크"
              className="w-4 h-4 mr-2 mt-1"
            />
            <span>등기부상 소유권, 채권, 기타 권리 상태 모두 양호해요.</span>
          </li>
        </ul>

        {/* 하단 안내 박스 */}
        <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
          <p className="mb-2">
            💡 신축 오피스텔 특성상 다수 임차인이 유사 조건으로 입주하기 때문에
            보증금 반환에 있어 집단 리스크가 발생할 수 있지만, 소유주가 다수로
            분산되어 있다면 위험이 낮아요.
          </p>
          <p>
            본 건은 개인 소유 단일 호실이기 때문에 해당 리스크도 제한적이에요.
          </p>
        </div>
      </div>
    </section>
  );
}

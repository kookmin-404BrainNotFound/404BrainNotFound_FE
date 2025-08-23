import { useNavigate } from "react-router-dom";

const TIPS = [
  { label: "등기부등본이란?", slug: "meaning-of-deung-gi" },
  { label: "1인 가구 주의사항", slug: "single-cautions" },
  { label: "전세와 월세의 차이점", slug: "contract-difference" },
  { label: "전세 사기 사례 모음", slug: "fake-contract-cases" },
  { label: "전세 체크리스트", slug: "contract-checklist" },
];

export default function MypageLayout({ username = "회원1" }) {
  const navigate = useNavigate();

  const goToSettings = () => navigate("/my/settings");
  const goToReports = () => navigate("/my/reports");
  const goToTip = (slug) => navigate(`/my/tips/${slug}`);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl flex items-start justify-between">
        <div className="mt-10 flex flex-col gap-1">
          <h2 className="text-lg font-medium">
            안녕하세요! <span className="text">{username}</span> 님
          </h2>
          <button
            onClick={goToSettings}
            className="text-sm text-gray-500 text-left hover:underline"
          >
            내 정보 설정하기
          </button>
        </div>

        <button
          onClick={goToSettings}
          className="p-2 mt-10 rounded-full hover:bg-gray-100"
          aria-label="설정"
          title="설정"
        >
          <img src="/icons/setting.png" alt="설정" className="w-5 h-5" />
        </button>
      </div>

      <button
        onClick={goToReports}
        className="bg-[#D9D9D9] rounded-md p-5 text-left shadow-sm hover:bg-gray-200 w-full"
      >
        <div className="text-lg font-medium">내 리포트 모아보기</div>
        <div className="text-sm font-medium">14건</div>
      </button>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={goToCleaning}
          className="bg-[#D9D9D9] rounded-md aspect-[5/4] flex items-start justify-start px-3 py-4 text-md font-medium text-left shadow-sm hover:bg-gray-200"
        >
          이사/청소 서비스
          <br /> 신청하기
        </button>

        <button
          onClick={goToLegal}
          className="bg-[#D9D9D9] rounded-md aspect-[5/4] flex items-start justify-start px-3 py-4 text-md font-medium text-left shadow-sm hover:bg-gray-200"
        >
          법률 전문가 연계
          <br />
          서비스 신청하기
        </button>
      </div>

      <div className="bg-[#F2F2F2] rounded-lg shadow-sm">
        <div className="p-4 font-semibold">팁 보러 가기(삭제예정)</div>

        <ul>
          {TIPS.map((tip, idx, arr) => (
            <li key={tip.slug}>
              <button
                onClick={() => goToTip(tip.slug)}
                className="w-full flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  {/*임시아이콘 */}
                  <div className="w-4 h-4 bg-red-400 rounded-sm" />
                  <span className="text-sm font-medium">{tip.label}</span>
                </div>
                <span className="text-gray-400" aria-hidden>
                  &gt;
                </span>
              </button>

              {idx < arr.length - 1 && (
                <div className="border-t border-gray-200 w-[85%] mx-auto" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import PageHeader from "../../components/PageHeader";

const CHECKLIST = [
  {
    title: "1. 기본 정보 확인",
    items: [
      "임대인(집주인)과 등기부등본 소유자 동일한지 확인",
      "중개사 자격증 및 소속 공인중개사 확인",
      "임대 목적물 주소와 실제 집 위치 일치 여부",
    ],
  },
  {
    title: "2. 등기부등본, 권리 관계 확인",
    items: [
      "등기부등본 발급 후 근저당권, 가압류, 전세권 등 확인",
      "집주인 외 제3자의 권리 주장(가압류, 압류) 여부 확인",
      "전입세대 열람으로 기존 세입자 유무 확인",
    ],
  },
  {
    title: "3. 계약 조건 확인",
    items: [
      "보증금 및 월세 금액",
      "계약 기간(시작일, 종료일)",
      "중도 해지 조항(위약금 규정 포함)",
      "관리비 항목 세부 내역(공용관리비, 개인 사용분 등)",
    ],
  },
  {
    title: "4. 집 상태 점검",
    items: [
      "수도, 전기, 가스 정상 작동 여부",
      "벽, 천장, 바닥 상태, 누수 흔적 여부",
      "창문, 방충망, 문 손잡이 등 하자 여부",
      "채광, 소음, 환기, 곰팡이 냄새 여부",
      "공동현관, 엘리베이터, CCTV 등 안전 시설 확인",
    ],
  },
  {
    title: "5. 보증금 보호 관련",
    items: [
      "확정일자 받을 계획 세우기",
      "전입신고 시기 확인",
      "전세보증보험·반환보증보험 가입 여부 검토",
    ],
  },
  {
    title: "6. 특약 사항",
    items: [
      "옵션 수리/교체 책임(임대인/세입자)",
      "재계약 시 조건(보증금, 월세 조정)",
      "반려동물, 도배 등 협의 내용 기재",
    ],
  },
  {
    title: "7. 입주 전/후 확인",
    items: [
      "잔금 지급 전 마지막 집 상태 점검",
      "관리비 정산 여부 확인",
      "열쇠/출입카드 인수 확인",
      "계약서 원본 각 1부 보관",
    ],
  },
];

export default function HomeChecklist() {
  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <PageHeader title="계약 체크리스트" />

      {/* 본문 */}
      <div className="px-4">
        <div className="bg-stone-100 rounded-xl p-3 space-y-3">
          {CHECKLIST.map((section, idx) => (
            <div 
              key={idx} 
              className="p-4 bg-white rounded-lg shadow-sm border"
            >
              <h3 className="font-semibold text-zinc-800 mb-3">{section.title}</h3>
              <ul className="space-y-2 text-xs text-neutral-600">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <input type="checkbox" className="w-3 h-3 appearance-none 
                    border-2 border-green-200 rounded-sm checked:bg-green-200 checked:border-green-200 transition-colors cursor-pointer " />
                    <span className="leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 이미지 저장하기 버튼 */}
        <div className="mt-4 pb-28">
          <button className="w-full h-[56px] bg-green-200 text-white rounded-lg font-medium">
            이미지 저장하기
          </button>
        </div>
      </div>
    </div>
  );
}

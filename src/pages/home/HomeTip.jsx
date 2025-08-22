import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";

const TIP_TITLES = {
  "meaning-of-deung-gi": "등기부등본이란?",
  "single-cautions": "1인 가구 주의사항",
  "contract-difference": "전세와 월세의 차이점",
  "fake-contract-cases": "전세 사기 사례 모음",
  "contract-checklist": "전세 체크리스트",
};

const TIP_CONTENTS = {
  "meaning-of-deung-gi": `
등기부등본은 부동산의 소유 관계와 권리 관계를 증명하는 공식 문서입니다.
여기에는 부동산의 소유자 정보, 소유권 이전 기록, 근저당권, 전세권 등 각종 권리 사항이 기재됩니다.
집을 매매하거나 전·월세 계약을 체결하기 전 반드시 확인해야 하며,
특히 근저당 비율이 높거나 가압류, 압류 기록이 있는 경우 주의가 필요합니다.
  `,
  "single-cautions": `
1인 가구는 주거 보안과 생활 안전에 특히 신경 써야 합니다.
현관 보안장치(이중 잠금, 디지털 도어락 비밀번호 변경), 창문 잠금장치 설치 등
물리적 보안을 강화하세요.  
또한, 택배 수령 시에는 무인함을 활용하거나 배송시간을 조율하고,
SNS에 자신의 위치나 외출 여부를 노출하지 않는 것이 좋습니다.
자세한 정보는 <a href="https://www.police.go.kr" target="_blank" class="text-blue-500 underline">경찰청 1인가구 안전 가이드</a>에서 확인할 수 있습니다.
  `,
  "contract-difference": `
전세는 계약 기간 동안 일정 금액의 보증금을 집주인에게 맡기고 거주하는 방식이며,
계약 종료 시 보증금을 전액 돌려받습니다.  
월세는 매월 일정 금액의 임대료를 지불하는 형태로,
보증금이 전세보다 적고, 거주 중 현금 유출이 지속됩니다.
전세는 초기 자금 부담이 크지만 장기 거주에 유리하고,
월세는 초기 부담은 적지만 장기적으로 총 지출이 많아질 수 있습니다.
  `,
  "fake-contract-cases": `
전세 사기 사례에는 대표적으로 ‘이중계약’과 ‘깡통전세’가 있습니다.  
이중계약은 집주인이 같은 부동산을 여러 사람과 계약하는 경우이고,
깡통전세는 주택 시세보다 전세금이 과도하게 높아 보증금 반환이 어려운 상황을 말합니다.
또한, 위임장 위조를 통한 대리인 사기, 허위 매물 게시 등도 있으니
등기부등본, 건축물대장, 소유자 신분증 등을 반드시 대조 확인해야 합니다.
  `,
  "contract-checklist": `
전·월세 계약 전 반드시 확인해야 할 체크리스트:
1. 등기부등본으로 소유자 확인 및 권리 관계 점검
2. 건축물대장과 실사용 면적 비교
3. 전입세대 열람으로 기존 세입자 유무 확인
4. 확정일자 받기 및 전입신고
5. 계약금·중도금·잔금 지급 시 계좌 명의 일치 여부 확인
이 절차를 지키면 전세사기나 분쟁을 예방할 수 있습니다.
  `,
};

export default function TipDetailPage() {
  const { slug } = useParams();
  const title = TIP_TITLES[slug] ?? "팁 상세";
  const content = TIP_CONTENTS[slug] ?? `"${title}"에 대한 상세 콘텐츠.`;

  return (
    <div className="bg-white min-h-screen">
      {/* 상단바 */}
      <PageHeader title={title} />

      {/* 본문 */}
      <div className="p-5 space-y-5">
        <p
          className="text-gray-700 leading-7"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}

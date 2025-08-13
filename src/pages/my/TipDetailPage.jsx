import { useParams, useNavigate } from "react-router-dom";

const TIP_TITLES = {
  "meaning-of-deung-gi": "등기부등본이란?",
  "single-cautions": "1인 가구 주의사항",
  "contract-difference": "전세와 월세의 차이점",
  "fake-contract-cases": "전세 사기 사례 모음",
  "contract-checklist": "전세 체크리스트",
};

export default function TipDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const title = TIP_TITLES[slug] ?? "팁 상세";

  return (
    <div className="p-5 space-y-4">
      <button onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:underline">
        ← 뒤로
      </button>
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="text-gray-700">
        "{title}"에 대한 상세 콘텐츠.
      </p>
    </div>
  );
}

import PageHeader from "../../../components/PageHeader";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";

export default function StyleIntro() {
  const navigate = useNavigate();

  return (
    <div className="py-4">
      <PageHeader title="주거 성향 입력" />

      <main className="px-5">
        <div className="flex flex-col items-start gap-3 mt-2">
          <img src="/icons/grsearch.png" className="w-10 h-13 mt-2" />

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              주거 성향을 알려주세요{" "}
            </h2>
            <p className="text-sm font-normal text-gray-500 mt-2">
              매물의 <span className="text-green-200 font-medium">적합도</span>
              를 측정하기 위해 주거 성향 정보가 필요해요. <br />
              알려 주신 정보는 다른 용도로 사용되지 않아요.{" "}
            </p>
          </div>

          <img
            src="/icons/fiveicons.png"
            alt="주거 성향 인트로 화면 아이콘"
            className="mx-auto mt-16 w-64 h-64 object-contain"
          />
        </div>
      </main>

      <div className="flex mt-auto fixed bottom-11 left-4 right-4 items-center gap-3">
        <Button onClick={() => navigate("/home/style/noise")}>시작하기</Button>
      </div>
    </div>
  );
}

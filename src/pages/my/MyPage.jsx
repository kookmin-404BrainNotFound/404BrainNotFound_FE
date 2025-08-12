export default function MyPage() {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border bg-white p-5">
        <h3 className="text-base font-semibold text-gray-900">
          나의 주거 성향 테스트
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          소음 민감도, 채광 선호, 예산, 생활 패턴 등을 간단히 체크해요.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50">
            🌞 채광 중요
          </button>
          <button className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50">
            🤫 소음 민감
          </button>
          <button className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50">
            🌃 야행성
          </button>
          <button className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50">
            🚌 대중교통 선호
          </button>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <button className="rounded-xl bg-indigo-600 px-4 py-2 text-white text-sm hover:bg-indigo-700">
            결과 보기
          </button>
          <button className="rounded-xl border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            나중에 할래요
          </button>
        </div>
      </div>

      <div className="rounded-2xl border bg-indigo-50/60 p-4">
        <p className="text-sm text-indigo-700">
          팁: 테스트 결과는 추천·진단 점수에 자동 반영돼요.
        </p>
      </div>
    </div>
  );
}

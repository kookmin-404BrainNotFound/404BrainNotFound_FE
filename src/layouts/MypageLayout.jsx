// 팁 아이콘 (빨간색,화살표>) , 회색줄 변경 , 팁 세부 페이지 구현 필요
// 톱니바퀴 설정페이지, 회원 이름 데이터 반영
export default function MypageLayout() {
  return (
    <div className="p-5 space-y-6">
    
      <div className="bg-white rounded-xl p-5 flex flex-col gap-1">
        <h2 className="text-lg font-medium">
          안녕하세요! <span className="text"> 회원1</span> 님 
        </h2>
        <button className="text-sm text-gray-500 text-left">내 정보 설정하기</button>
      </div>


      <button className="bg-[#D9D9D9] rounded-md p-5 text-left shadow-sm hover:bg-gray-200 w-full">
        <div className="text-lg font-medium">내 리포트 모아보기</div>     
        <div className="text-sm font-medium">14건</div>        
      </button>

      <div className="grid grid-cols-2 gap-3">       
        <button className="bg-[#D9D9D9] rounded-md aspect-[5/4] flex items-start justify-start
        p-5 text-md font-medium text-left shadow-sm hover:bg-gray-200">
          이사/청소 서비스<br /> 신청하기
        </button>

        <button className="bg-[#D9D9D9] rounded-md aspect-[5/4] flex items-start justify-start
        p-5 text-md font-medium text-left shadow-sm hover:bg-gray-200">
          법률 전문가 연계<br />서비스 신청하기
        </button>

      </div>

      <div className="bg-[#F2F2F2] rounded-lg shadow-sm">
        <div className="p-4 font-semibold border-b">팁 보러 가기</div>
        <ul>
          {[
            "등기부등본이란?",
            "1인 가구 주의사항",
            "전세와 월세의 차이점",
            "전세 사기 사례 모음",
            "전세 사기 사례 모음",
          ].map((tip, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between p-4 border-b last:border-none hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-red-400 rounded-sm"></div>
                <span className="text-sm font-medium">{tip}</span>
              </div>
              <span className="text-gray-400">&gt;</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

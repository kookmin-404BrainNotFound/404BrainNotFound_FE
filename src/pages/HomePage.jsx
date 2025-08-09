// src/pages/HomePage.jsx
import Layout from "../components/common/Layout";
import Button from "../components/common/Button";

const HomePage = () => {
  return (
    <Layout>
      <div className="text-center space-y-8">
        <div className="section-spacing pt-8">
          <div className="mb-6">
            <div>🏠</div>
            <p>
              AI 기반 위험도 분석으로
              <br />
              안전한 집을 찾아보세요
            </p>
          </div>
        </div>

        {/* 버튼 섹션 */}
        <div className="space-y-4 px-2">
          <Button
            onClick={() => (window.location.href = "/login")}
            className="w-full mobile-button text-base"
          >
            로그인
          </Button>
          <Button
            onClick={() => alert("회원가입 페이지로 이동!")}
            className="w-full mobile-button bg-gray-600 hover:bg-gray-700 text-base"
          >
            회원가입
          </Button>
        </div>

        {/* 기능 소개 섹션 */}
        <div className="bg-gray-50 rounded-xl p-6 mx-2 mt-8">
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex items-center justify-center space-x-2">
              <span>🔍</span>
              <span>AI 위험도 분석</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span>📋</span>
              <span>계약서 자동 검토</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span>💡</span>
              <span>맞춤 추천 서비스</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

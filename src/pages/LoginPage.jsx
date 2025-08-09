// src/pages/LoginPage.jsx
import { useState } from "react";
import Layout from "../components/common/Layout";
import Button from "../components/common/Button";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`로그인 시도: ${email}`);
    // 나중에 API 호출 로직 들어갈 자리
  };

  return (
    <Layout>
      <div className="pt-8">
        {/* 타이틀 */}
        <div className="text-center mb-8">
          <div className="text-3xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">로그인</h2>
          <p className="text-gray-600 text-sm">안전한 집 찾기를 시작해보세요</p>
        </div>

        {/* 로그인 폼 */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mx-2">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mobile-input w-full"
                placeholder="이메일을 입력하세요"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mobile-input w-full"
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full mobile-button text-base mt-6"
            >
              로그인
            </Button>
          </form>
        </div>

        {/* 회원가입 링크 */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            계정이 없으신가요?
            <button
              onClick={() => alert("회원가입 페이지로 이동!")}
              className="text-blue-600 hover:underline ml-1 font-medium"
            >
              회원가입
            </button>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;

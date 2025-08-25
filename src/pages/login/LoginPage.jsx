import { useState } from "react";
import PageHeader from "../../components/PageHeader";

export default function MySetting() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // 회원가입용
  const [userId, setUserId] = useState(null);

  // 회원가입
  const handleRegister = async () => {
    try {
      const res = await fetch("/api/user/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      if (!res.ok) throw new Error("회원가입 실패");
      const data = await res.json();
      console.log("회원가입 결과:", data);

      alert(`회원가입 성공! user_id: ${data.id}`);
      setUserId(data.id);
      localStorage.setItem("userId", data.id); // 저장
    } catch (err) {
      console.error(err);
      alert("회원가입 실패");
    }
  };

  // 로그인
  const handleLogin = async () => {
    try {
      const res = await fetch("/api/user/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("로그인 실패");
      const data = await res.json();
      console.log("로그인 결과:", data);

      alert(`로그인 성공! user_id: ${data.id}`);
      setUserId(data.id);
      localStorage.setItem("userId", data.id);
    } catch (err) {
      console.error(err);
      alert("로그인 실패");
    }
  };

  return (
    <div className="min-h-screen bg-white flex-col px-4 py-4">
      {/* 상단 헤더 */}
      <PageHeader className />

      {/* 본문 */}
      <div className="flex flex-col items-center flex-1 px-6">
        {/* 로고 */}
        <img
          src="/icons/loginpage.png"
          alt="든든집 로고"
          className="w-60 h-20  mt-16 mb-10"
        />

        {/* 입력창 */}
        <div className="w-full max-w-xs space-y-3">
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border bg-white  border-green-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:bg-white"
          />

          <input
            type="email"
            placeholder="아이디"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border bg-white  border-green-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:bg-white"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border bg-whites border-green-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:bg-white"
          />


          {/* 하단 링크 */}
          <div className="flex justify-center text-xs text-gray-500 space-x-4 py-2 pb-16">
            <button onClick={handleRegister} className="hover:underline">회원가입</button>
            <span>|</span>
            <button className="hover:underline">아이디 찾기</button>
            <span>|</span>
            <button className="hover:underline">비밀번호 찾기</button>
          </div>

          {/* 로그인 버튼 */}
          <button
            onClick={handleLogin}
            className="w-full bg-green-200 text-white py-3 rounded-lg font-medium"
          >
            로그인
          </button>


          {userId && (
            <p className="text-gray-700 text-center mt-4">
              현재 로그인한 유저 ID: {userId}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
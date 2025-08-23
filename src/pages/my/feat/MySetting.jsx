import { useState } from "react";
import PageHeader from "../../../components/PageHeader";

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
    <div>
      <PageHeader title="로그인/회원가입" />
      <div className="p-5 space-y-3">
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded p-2"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded p-2"
        />
        <input
          type="text"
          placeholder="이름 (회원가입 전용)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded p-2"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-200 text-white py-2 rounded"
        >
          회원가입
        </button>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          로그인
        </button>

        {userId && (
          <p className="text-gray-700 mt-3">현재 로그인한 유저 ID: {userId}</p>
        )}
      </div>
    </div>
  );
}

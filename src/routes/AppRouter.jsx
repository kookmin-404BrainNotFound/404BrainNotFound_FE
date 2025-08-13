// src/routes/AppRouter.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ExploreLayout from "../layouts/ExploreLayout";

import ExploreHome from "../pages/explore/ExploreHome";
import ExploreTest from "../pages/explore/ExploreTest";
import HomePage from "../pages/home/MainHome";
import LoginPage from "../pages/login/LoginPage";

import MypageLayout from './../layouts/MypageLayout';
import MySetting from "../pages/my/MySetting"; 
import TipDetailPage from "../pages/my/TipDetailPage";


export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Navigate to="/explore" replace />} />
        <Route path="explore" element={<ExploreLayout />}>
          <Route index element={<ExploreHome />} />
          <Route path="test" element={<ExploreTest />} />
        </Route>
        <Route path="my" element={<MypageLayout />} />             
        <Route path="home" element={<HomePage />} />
        <Route
          path="*"
          element={
            <div className="p-6 text-center text-gray-500">
              페이지를 찾을 수 없습니다.
            </div>
          }
        />

      <Route path="/" element={<RootLayout />}>
        <Route path="my" element={<MypageLayout username="회원1" />}>
          {/* DB 설정 후 회원1 - > {user.name} 로 수정 */}
        </Route>
        <Route path="my/settings" element={<MySetting />} />
        <Route path="my/tips/:slug" element={<TipDetailPage />} />
      </Route>

      </Route>
    </Routes>
  );
}
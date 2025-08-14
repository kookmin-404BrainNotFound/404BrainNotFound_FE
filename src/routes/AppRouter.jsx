// src/routes/AppRouter.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ExploreLayout from "../layouts/ExploreLayout";
import ExploreAddress from "../pages/explore/ExploreAddress";
import DealForm from "../pages/explore/DealForm";

import HomePage from "../pages/home/MainHome";
import LoginPage from "../pages/login/LoginPage";

import MypageLayout from "../layouts/MypageLayout";
import MySetting from "../pages/my/MySetting";
import TipDetailPage from "../pages/my/TipDetailPage";
import ReportList from "../pages/my/ReportList";
import CleaningService from "../pages/my/CleaningService";
import LegalService from "../pages/my/LegalService";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Navigate to="/explore" replace />} />
        <Route path="explore" element={<ExploreLayout />}>
          <Route index element={<ExploreAddress />} />
          <Route path="deal" element={<DealForm />} />
        </Route>

        <Route path="home" element={<HomePage />} />

        <Route path="my" element={<MypageLayout username="회원1" />} />
        <Route path="my/settings" element={<MySetting />} />       
        <Route path="my/reports" element={<ReportList />} />
        <Route path="my/cleaning" element={<CleaningService />} />  
        <Route path="my/legal" element={<LegalService />} />
        <Route path="my/tips/:slug" element={<TipDetailPage />} />

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

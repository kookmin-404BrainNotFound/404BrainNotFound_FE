// src/routes/AppRouter.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";

import ExploreLayout from "../layouts/ExploreLayout";
import ExploreAddress from "../pages/explore/ExploreAddress";
import DealForm from "../pages/explore/DealForm";
import FinalScore from "../pages/explore/steps/FinalScore";
import SemiScore from "../pages/explore/steps/SemiScore";
import DocAnalyze from "../pages/explore/steps/doc/DocAnalyze";
import DocMethod from "../pages/explore/steps/doc/DocMethod";
import DocUpload from "../pages/explore/steps/doc/DocUpload";

import HomePage from "../pages/home/MainHome";
import LoginPage from "../pages/login/LoginPage";

import MypageLayout from "../layouts/MypageLayout";
import Mypage from "../pages/my/Mypage";
import MySetting from "../pages/my/feat/MySetting";
import TipDetailPage from "../pages/my/feat/TipDetailPage";
import ReportList from "../pages/my/feat/ReportList";
import CleaningService from "../pages/my/feat/CleaningService";
import LegalService from "../pages/my/feat/LegalService";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={<RootLayout />}>
        <Route index element={<Navigate to="/explore" replace />} />

        <Route path="home" element={<HomePage />} />

        <Route path="explore" element={<ExploreLayout />}>
          <Route index element={<Navigate to="address" replace />} />
          <Route path="address" element={<ExploreAddress />} />
          <Route path="deal" element={<DealForm />} />
          <Route path="semiscore" element={<SemiScore />} />
          <Route path="doc">
            <Route index element={<Navigate to="upload" replace />} />
            <Route path="upload" element={<DocUpload />} />
            <Route path="method" element={<DocMethod />} />
            <Route path="analyze" element={<DocAnalyze />} />
          </Route>
          <Route path="finalscore" element={<FinalScore />} />
        </Route>

        <Route path="my" element={<MypageLayout username="회원1" />}>
          <Route index element={<Mypage />} />
          <Route path="settings" element={<MySetting />} />
          <Route path="reports" element={<ReportList />} />
          <Route path="cleaning" element={<CleaningService />} />
          <Route path="legal" element={<LegalService />} />
          <Route path="tips/:slug" element={<TipDetailPage />} />
        </Route>

        <Route
          path="*"
          element={
            <div className="p-6 text-center text-gray-500">
              페이지를 찾을 수 없습니다.
            </div>
          }
        />
      </Route>
    </Routes>
  );
}

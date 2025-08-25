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
import DocIntro from "../pages/explore/steps/doc/DocIntro";

import ContractHome from "../pages/contract/ContractHome";
import ContractScan from "../pages/contract/ContractScan";
import ContractAnalyze from "../pages/contract/ContractAnalyze";
import CleaningService from "../pages/contract/CleaningService";
import LegalService from "../pages/contract/LegalService";
import ContractResult from "../pages/contract/ContractResult";

import HomePage from "../pages/home/MainHome";
import StyleIntro from "../pages/home/style/StyleIntro";
import NoiseStyle from "../pages/home/style/NoiseStyle";
import SunlightStyle from "../pages/home/style/SunlightStyle";
import CeilingStyle from "../pages/home/style/CeilingStyle";
import DirectionStyle from "../pages/home/style/DirectionStyle";
import EtcStyle from "../pages/home/style/EtcStyle";
import CompleteStyle from "../pages/home/style/CompleteStyle";
import TipDetailPage from "../pages/home/HomeTip";
import HomeChecklist from "../pages/home/HomeChecklist";

import LoginPage from "../pages/login/LoginPage";
import Onboarding from "../pages/login/Onboarding";

import MypageLayout from "../layouts/MypageLayout";
import Mypage from "../pages/my/Mypage";
import MySetting from "../pages/my/feat/MySetting";
import ReportList from "../pages/my/feat/ReportList";
import MyClean from "../pages/my/feat/MyCleaningService";
import MyLegal from "../pages/my/feat/MyLegalService";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={<RootLayout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home">
          <Route index element={<HomePage />} />
          <Route path="checklist" element={<HomeChecklist />} />
          <Route path="tips/:slug" element={<TipDetailPage />} />
          <Route path="style">
            <Route index element={<Navigate to="intro" replace />} />
            <Route path="intro" element={<StyleIntro />} />
            <Route path="noise" element={<NoiseStyle />} />
            <Route path="sunlight" element={<SunlightStyle />} />
            <Route path="ceiling" element={<CeilingStyle />} />
            <Route path="direction" element={<DirectionStyle />} />
            <Route path="etc" element={<EtcStyle />} />
            <Route path="complete" element={<CompleteStyle />} />
          </Route>
        </Route>

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
            <Route path="intro" element={<DocIntro />} />
          </Route>
          <Route path="finalscore" element={<FinalScore />} />
        </Route>

        <Route path="explore/doc/analyze" element={<DocAnalyze />} />

        <Route path="contract">
          <Route index element={<ContractHome />} />
          <Route path="scan" element={<ContractScan />} />
          <Route path="analyze" element={<ContractAnalyze />} />
          <Route path="cleaning" element={<CleaningService />} />
          <Route path="legal" element={<LegalService />} />
          <Route path="result" element={<ContractResult />} />
        </Route>

        <Route path="my" element={<MypageLayout username="회원1" />}>
          <Route index element={<Mypage />} />
          <Route path="settings" element={<MySetting />} />
          <Route path="reports" element={<ReportList />} />
          <Route path="legalreport" element={<MyLegal />} />
          <Route path="cleanreport" element={<MyClean />} />
        </Route>

        <Route path="onboarding" element={<Onboarding />}>
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

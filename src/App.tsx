import { Routes, Route } from "react-router";
import PrivateLayout from "@/layouts/PrivateLayout";
import PublicLayout from "@/layouts/PublicLayout";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import SignUpPage from "@/pages/SignUpPage";
import ArticlesPage from "@/pages/ArticlesPage";
import InterestsPage from "@/pages/InterestsPage";
import ActivitiesPage from "@/pages/ActivitiesPage";
import NotFound from "@/pages/not-found";
import TestPage from "@/pages/TestPage";
import { RequireAuth } from "@/features/auth/guards/RequireAuth";

function App() {
  return (
    <Routes>
      {/* 보호 라우트: 로그인 필요 */}
      <Route element={<RequireAuth />}>
        <Route element={<PrivateLayout />}>
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:articleId" element={<ArticlesPage />} />
          <Route path="/interests" element={<InterestsPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
        </Route>
      </Route>

      {/* 게스트 전용 */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/test" element={<TestPage />} />
      </Route>
    </Routes>
  );
}

export default App;

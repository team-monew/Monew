import { Routes, Route } from "react-router";
import PrivateLayout from "@/layouts/PrivateLayout";
import PublicLayout from "@/layouts/PublicLayout";
import LandingPage from "@/pages/landing/LandingPage";
import LoginPage from "@/pages/auth/login/LoginPage";
import SignUpPage from "@/pages/auth/signup/SignUpPage";
import ArticlesPage from "@/pages/articles/ArticlesPage";
import InterestsPage from "@/pages/interests/InterestsPage";
import ActivitiesPage from "@/pages/activities/ActivitiesPage";
import NotFound from "@/pages/not-found";
import TestPage from "./pages/test/TestPage";

function App() {
  return (
    <Routes>
      <Route element={<PrivateLayout />}>
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/interests" element={<InterestsPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
      </Route>

      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

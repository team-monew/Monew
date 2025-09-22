import { Routes, Route, Navigate } from "react-router";
import PrivateLayout from "@/layouts/PrivateLayout";
import PublicLayout from "@/layouts/PublicLayout";
import LoginPage from "@/pages/auth/login/LoginPage";
import SignUpPage from "@/pages/auth/signup/SignUpPage";
import ArticlesPage from "@/pages/articles/ArticlesPage";
import InterestsPage from "@/pages/interests/InterestsPage";
import ActivitiesPage from "@/pages/activities/ActivitiesPage";

function App() {
  return (
    <Routes>
      <Route element={<PrivateLayout />}>
        <Route path="/" element={<Navigate to="/articles" replace />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/interests" element={<InterestsPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
      </Route>

      <Route element={<PublicLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  );
}

export default App;

import { Routes, Route, Navigate } from "react-router";
import AppLayout from "@/app/AppLayout";
import LoginPage from "@/pages/auth/login/LoginPage";
import SignUpPage from "@/pages/auth/signup/SignUpPage";
import ArticlesPage from "@/pages/articles/ArticlesPage";
import InterestsPage from "@/pages/interests/InterestsPage";
import ActivitiesPage from "@/pages/activities/ActivitiesPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/articles" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/interests" element={<InterestsPage />} />
        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  );
}

export default App;

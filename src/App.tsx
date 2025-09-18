import { Routes, Route, Navigate } from "react-router";
import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";
import LoginPage from "@/pages/auth/login/LoginPage";
import SignUpPage from "@/pages/auth/signup/SignUpPage";
import FeedPage from "@/pages/feed/FeedPage";
import InterestsPage from "@/pages/interests/InterestsPage";
import HistoryPage from "@/pages/history/HistoryPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/feed" replace />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/interests" element={<InterestsPage />} />
        <Route path="*" element={<div>404</div>} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}

export default App;

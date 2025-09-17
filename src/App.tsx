import { Routes, Route, Navigate } from "react-router";
import LoginPage from "@/pages/auth/login/LoginPage";
import SignUpPage from "@/pages/auth/signup/SignUpPage";
import FeedPage from "@/pages/feed/FeedPage";
import InterestsPage from "@/pages/interests/InterestsPage";
import HistoryPage from "@/pages/history/HistoryPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/feed" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/feed" element={<FeedPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/interests" element={<InterestsPage />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}

export default App;

import { Routes, Route } from "react-router";
import PrivateLayout from "@/layouts/PrivateLayout";
import PublicLayout from "@/layouts/PublicLayout";

import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import SignUpPage from "@/pages/SignUpPage";
import ArticlesPage from "@/pages/ArticlesPage";
import InterestsPage from "@/pages/InterestsPage";
import ActivitiesPage from "@/pages/ActivitiesPage";
import TestPage from "./pages/TestPage";

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
        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  );
}

export default App;

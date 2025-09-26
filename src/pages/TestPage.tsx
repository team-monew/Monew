import { useNavigate } from "react-router";
import { ROUTES } from "@/shared/constants/routes";
import { login } from "@/api/users";
import Button from "@/components/button/Button";
import { toast } from "react-toastify";
import NotificationPanel from "@/features/notifications/components/NotificationsPanel";

const testEmail = {
  email: "mmgg@codeit.com",
  password: "asdf1234",
};

export default function TestPage() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await login(testEmail);
      sessionStorage.setItem("user", JSON.stringify(user));
      console.log("로그인 성공", user);
      toast.success("환영합니다! 로그인이 완료되었습니다.");

      navigate(ROUTES.ARTICLES);
    } catch (error) {
      console.error("로그인 실패", error);
      toast.error("잠시 후 다시 시도해 주세요.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      테스트 페이지
      <Button onClick={handleLogin} className="maw-w-[400px] p-4">
        테스트 계정 로그인
      </Button>
      <NotificationPanel />
    </div>
  );
}

import LoginForm from "@/pages/auth/login/components/LoginForm";
import { Link } from "react-router";
import { ROUTES } from "@/shared/constants/routes";

function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <LoginForm />
      <div className="flex text-center gap-2.5 mt-6">
        <p className="text-16-m text-gray-500">아직 계정이 없으신가요?</p>
        <Link
          to={ROUTES.AUTH_SIGNUP}
          className="text-16-m text-cyan-600 underline"
        >
          회원가입 하기
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;

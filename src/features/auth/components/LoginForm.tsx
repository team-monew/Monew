import { useState } from "react";
import { useNavigate } from "react-router";
import Input from "@/components/Input";
import Button from "@/components/button/Button";
import { loginAndStore } from "@/features/auth/actions";
import {
  validateEmail,
  validatePassword,
} from "@/shared/utils/inputValidation";
import { toast } from "react-toastify";
import { ROUTES } from "@/shared/constants/routes";

export default function LoginForm() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [touchedField, setTouchedField] = useState<{
    email: boolean;
    password: boolean;
  }>({
    email: false,
    password: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  // 입력 필드별 유효성 검증
  const runEmailValidate = (value: string) => {
    if (!value.trim()) return "이메일을 입력해 주세요.";
    if (!validateEmail(value)) return "이메일 형식이 올바르지 않습니다.";
    return "";
  };

  const runPasswordValidate = (value: string) => {
    if (!value.trim()) return "비밀번호를 입력해 주세요.";
    if (!validatePassword(value))
      return "영문과 숫자를 포함해 8자 이상 입력해 주세요";
    return "";
  };

  // value 변경 핸들러
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (touchedField.email) setEmailError(runEmailValidate(value));
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (touchedField.password) setPasswordError(runPasswordValidate(value));
  };

  // blur 시 에러 노출
  const onBlurEmail = () => {
    if (!touchedField.email) setTouchedField((t) => ({ ...t, email: true }));
    setEmailError(runEmailValidate(email));
  };
  const onBlurPassword = () => {
    if (!touchedField.password)
      setTouchedField((t) => ({ ...t, password: true }));
    setPasswordError(runPasswordValidate(password));
  };

  // 폼 유효성
  const formValid =
    emailError === "" && passwordError === "" && email && password;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailErr = runEmailValidate(email);
    const passwordErr = runPasswordValidate(password);
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    setTouchedField({ email: true, password: true });
    if (emailErr || passwordErr) return;

    setIsSubmitting(true);
    setSubmitError("");
    try {
      await loginAndStore({ email, password });
      toast.success("환영합니다! 로그인이 완료되었습니다.");
      nav(ROUTES.ARTICLES, { replace: true });
    } catch (error) {
      const message =
        (error as Error)?.message ?? "잠시 후 다시 시도해 주세요.";
      setSubmitError(message);
      toast.error("잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-[400px] gap-4"
    >
      <Input
        id="email"
        label="아이디"
        placeholder="이메일을 입력해 주세요"
        value={email}
        onChange={onChangeEmail}
        onBlur={onBlurEmail}
        error={touchedField.email ? emailError : ""}
        autoComplete="username"
        inputMode="email"
      />
      <Input
        id="password"
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해 주세요"
        value={password}
        onChange={onChangePassword}
        onBlur={onBlurPassword}
        error={touchedField.password ? passwordError : ""}
        autoComplete="current-password"
      />
      {submitError && (
        <p className="mt-1.5 px-1 text-14-m text-error" role="alert">
          {submitError}
        </p>
      )}
      <Button
        type="submit"
        className="w-full mt-8"
        disabled={!formValid || isSubmitting}
      >
        {isSubmitting ? "로그인 중..." : "로그인하기"}
      </Button>
    </form>
  );
}

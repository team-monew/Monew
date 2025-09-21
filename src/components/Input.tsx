import VisibilityOn from "@/assets/icons/visibility-on.svg";
import VisibilityOff from "@/assets/icons/visibility-off.svg";
import { useId, useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export default function Input({
  type = "text",
  error,
  placeholder,
  value,
  onChange,
  label,
  className,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  const inputId = useId();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getInputType = () => {
    if (type !== "password") {
      return type;
    }
    return showPassword ? "text" : "password";
  };

  return (
    <div>
      {label && (
        <label
          htmlFor={inputId}
          className="font-pretendard font-medium text-base leading-6 text-slate-600"
        >
          {label}
        </label>
      )}

      <div
        className={`w-full min-h-14 border rounded-lg mt-1 py-4 px-5 gap-2.5 bg-white ${error ? "border-red-500" : "border-slate-200"} focus-within:border-blue-500 ${className || ""}`}
      >
        <div className="flex items-center justify-between">
          <input
            type={getInputType()}
            placeholder={placeholder}
            className="flex-1 outline-none bg-transparent font-pretendard font-medium text-base leading-6 text-slate-900 pr-2"
            value={value}
            onChange={onChange}
            id={inputId}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "비밀번호 보기" : "비밀번호 숨기기"}
            >
              {showPassword ? (
                <img
                  src={VisibilityOn}
                  className="w-6 h-6"
                  alt="비밀번호 보기"
                />
              ) : (
                <img
                  src={VisibilityOff}
                  className="w-6 h-6"
                  alt="비밀번호 숨기기"
                />
              )}
            </button>
          )}
        </div>
      </div>
      {error && (
        <p className="font-pretendard font-medium text-sm leading-5 text-red-500 mt-1 px-1">
          {error}
        </p>
      )}
    </div>
  );
}

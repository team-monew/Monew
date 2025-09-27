export const required =
  (msg = "필수 입력값입니다.") =>
  (v: string) =>
    v.trim() ? "" : msg;

export const isEmail =
  (msg = "이메일 형식이 올바르지 않습니다.") =>
  (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : msg;

export const isPassword =
  (msg = "영문과 숫자를 포함해 8자 이상 입력해 주세요") =>
  (v: string) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v) ? "" : msg;

export const equalsTo =
  (getOther: () => string, msg = "비밀번호가 일치하지 않습니다.") =>
  (v: string) =>
    v === getOther() ? "" : msg;

export const maxLength =
  (len: number, msg = `${len}자 이하로 입력해 주세요`) =>
  (v: string) =>
    v.length <= len ? "" : msg;

export const minLength =
  (len: number, msg = `${len}자 이상 입력해 주세요`) =>
  (v: string) =>
    v.length >= len ? "" : msg;

export const compose =
  (...validators: Array<(v: string) => string>) =>
  (v: string) => {
    for (const fn of validators) {
      const error = fn(v);
      if (error) return error;
    }
    return "";
  };

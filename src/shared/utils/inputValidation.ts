// input 유효성 검사 유틸

export function validateName(value: string, maxLength = 10) {
  return value.length <= maxLength;
}

export function validateEmail(value: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

export function validatePassword(value: string, minLength = 8) {
  const hasAlphabet = /[a-zA-Z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  return value.length >= minLength && hasAlphabet && hasNumber;
}

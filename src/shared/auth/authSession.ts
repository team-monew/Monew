import type { User } from "@/api/users/types";
import { AUTH_CHANGE } from "@/shared/constants/events";

const KEY = "user";

export type AuthUser = User | null;

function read(): AuthUser {
  try {
    const userJson = sessionStorage.getItem(KEY);
    return userJson ? (JSON.parse(userJson) as User) : null;
  } catch {
    return null;
  }
}

function write(user: User) {
  sessionStorage.setItem(KEY, JSON.stringify(user));
  // same-tab 변경 알림
  // (세션스토리지는 같은 탭에 'storage' 이벤트가 발생하지 않음)
  dispatchEvent(new CustomEvent(AUTH_CHANGE));
}

function clear() {
  sessionStorage.removeItem(KEY);
  dispatchEvent(new CustomEvent(AUTH_CHANGE));
}

export function withUserHeader() {
  const u = read();
  return u ? { headers: { "Monew-Request-User-ID": u.id } } : {};
}

export const authSession = { read, write, clear, KEY };

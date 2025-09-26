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

function write(user: User): boolean {
  let ok = true;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(user));
  } catch (error) {
    ok = false;
    console.error("[authSession] write failed", error);
  } finally {
    dispatchEvent(new CustomEvent(AUTH_CHANGE)); // same-tab에 변경 알림
  }
  return ok;
}

function clear(): boolean {
  let ok = true;
  try {
    sessionStorage.removeItem(KEY);
  } catch (error) {
    ok = false;
    console.error("[authSession] clear failed", error);
  } finally {
    dispatchEvent(new CustomEvent(AUTH_CHANGE));
  }
  return ok;
}

export function withUserHeader() {
  const u = read();
  return u ? { headers: { "Monew-Request-User-ID": u.id } } : {};
}

export const authSession = { read, write, clear, KEY };

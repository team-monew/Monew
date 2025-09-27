import type { User } from "@/api/users/types";
import { AUTH_CHANGE } from "@/shared/constants/events";

const KEY = "user";

export type AuthUser = User | null;

let cachedUser: AuthUser = null;
let hasRead = false;

function read(): AuthUser {
  if (hasRead) {
    return cachedUser;
  }

  try {
    const userJson = sessionStorage.getItem(KEY);
    cachedUser = userJson ? (JSON.parse(userJson) as User) : null;
    hasRead = true;
    return cachedUser;
  } catch {
    cachedUser = null;
    hasRead = true;
    return null;
  }
}

function write(user: User): boolean {
  let ok = true;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(user));
    cachedUser = user; // 캐시 업데이트
    hasRead = true;
  } catch (error) {
    ok = false;
    console.error("[authSession] write failed", error);
  } finally {
    dispatchEvent(new CustomEvent(AUTH_CHANGE));
  }
  return ok;
}

function clear(): boolean {
  let ok = true;
  try {
    sessionStorage.removeItem(KEY);
    cachedUser = null; // 캐시 클리어
    hasRead = false;
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

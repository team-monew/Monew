import type { User } from "@/api/users/types";

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
  dispatchEvent(new CustomEvent("auth:change"));
}

function clear() {
  sessionStorage.removeItem(KEY);
  dispatchEvent(new CustomEvent("auth:change"));
}

export function withUserHeader() {
  const u = read();
  return u ? { headers: { "Monew-Request-User-ID": u.id } } : {};
}

export const authSession = { read, write, clear, KEY };

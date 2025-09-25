import { login, signUp } from "@/api/users";
import type * as T from "@/api/users/types";
import { authSession } from "@/shared/auth/authSession";

function normalizeError(err: unknown): Error {
  if (err && typeof err === "object" && "response" in (err as any)) {
    const res = (err as any).response;
    const msg = res?.data?.message ?? res?.statusText ?? "Request failed";
    return new Error(msg);
  }
  return err instanceof Error ? err : new Error("Unknown error");
}

export async function loginAndStore(body: T.LoginBody) {
  try {
    const user = await login(body);
    authSession.write(user);
    return user;
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function signUpAndStore(body: T.SignUpBody) {
  try {
    const user = await signUp(body);
    authSession.write(user);
    return user;
  } catch (error) {
    throw normalizeError(error);
  }
}

export function logout() {
  authSession.clear();
}

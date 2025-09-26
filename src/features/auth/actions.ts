import axios from "axios";
import { login, signUp } from "@/api/users";
import type * as T from "@/api/users/types";
import { authSession } from "@/features/auth/utils/authSession";

function getDataMessage(data: unknown): string | undefined {
  if (data && typeof data === "object" && "message" in data) {
    const msg = (data as { message?: unknown }).message;
    return typeof msg === "string" ? msg : undefined;
  }
  return undefined;
}

function normalizeError(err: unknown): Error {
  if (axios.isAxiosError(err)) {
    const res = err.response;
    const msg =
      getDataMessage(res?.data) ??
      res?.statusText ??
      err.message ??
      "Request failed";
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

import { login, signUp } from "@/api/users";
import { authSession } from "@/features/auth/utils/authSession";
import { normalizeError } from "@/shared/lib/http";
import type * as T from "@/api/users/types";

export async function loginAndStore(body: T.LoginBody) {
  try {
    const user = await login(body);
    authSession.write(user);
    return user;
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function signUpAction(body: T.SignUpBody) {
  try {
    await signUp(body);
  } catch (error) {
    throw normalizeError(error);
  }
}

export function logout() {
  authSession.clear();
}

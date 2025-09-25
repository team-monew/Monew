import { useSyncExternalStore } from "react";
import { authSession } from "@/shared/auth/authSession";
import type { AuthUser } from "@/shared/auth/authSession";

function subscribe(callback: () => void) {
  const onCustom = () => callback();

  window.addEventListener("auth:change", onCustom as EventListener);
  return () => {
    window.removeEventListener("auth:change", onCustom as EventListener);
  };
}

export function useAuth(): AuthUser {
  return useSyncExternalStore(subscribe, authSession.read, authSession.read);
}

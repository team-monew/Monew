// 커스텀 이벤트(AUTH_CHANGE)로 'storage' 변경 알림을 브로드캐스트

import { useSyncExternalStore } from "react";
import { authSession } from "@/features/auth/utils/authSession";
import type { AuthUser } from "@/features/auth/utils/authSession";
import { AUTH_CHANGE } from "@/shared/constants/events";

function subscribe(onStoreChange: () => void) {
  const handler: EventListener = () => onStoreChange();

  window.addEventListener(AUTH_CHANGE, handler);
  return () => {
    window.removeEventListener(AUTH_CHANGE, handler);
  };
}

export function useAuth(): AuthUser {
  return useSyncExternalStore(subscribe, authSession.read, authSession.read);
}

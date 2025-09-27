import { useAuth } from "@/features/auth/hooks/useAuth";
import type { UserId } from "@/types/ids";

export function useAuthInfo() {
  const user = useAuth();
  const userId: UserId | null = user ? (user.id as UserId) : null;

  return {
    isAuthenticated: user !== null,
    userName: user?.nickname ?? "Guest",
    userEmail: user?.email ?? "",
    userId,
    userCreatedAt: user?.createdAt,
    user,
  };
}

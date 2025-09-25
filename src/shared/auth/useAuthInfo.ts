import { useAuth } from "@/shared/auth/useAuth";

export function useAuthInfo() {
  const user = useAuth();
  const isAuthenticated = user !== null;

  return {
    isAuthenticated,
    userName: user?.nickname ?? "Guest",
    userEmail: user?.email ?? "",
    userId: user?.id,
    userCreatedAt: user?.createdAt,
    user,
  };
}

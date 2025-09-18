import { api } from "@/shared/api/axiosInstance";
import type { SignUpRequest } from "@/shared/api/users/type";
import type { LoginRequest } from "@/shared/api/users/type";

export const signUp = async ({ payload }: { payload: SignUpRequest }) => {
  const { data } = await api.post<SignUpRequest>("/users", payload);
  return data;
};

export const login = async ({ payload }: { payload: LoginRequest }) => {
  const { data } = await api.post<LoginRequest>("/users/login", payload);
  return data;
};

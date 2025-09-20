import { http } from "@/lib/http";

export type LoginBody = { email: string; password: string };
export type User = {
  id: number;
  email: string;
  nickname: string;
  createdAt: string;
};

export async function login(body: LoginBody): Promise<User> {
  const { data } = await http.post<User>("/users/login", body);
  return data;
}

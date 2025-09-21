import { http } from "@/lib/http";

export type User = {
  id: string;
  email: string;
  nickname: string;
  createdAt: string;
};

export type SignUpBody = { email: string; nickname: string; password: string };
export type LoginBody = { email: string; password: string };
export type UpdateUserBody = { nickname: string };

/* 회원가입 */
export async function signUp(body: SignUpBody): Promise<User> {
  const { data } = await http.post<User>("/users", body);
  return data;
}

/* 로그인 */
export async function login(body: LoginBody): Promise<User> {
  const { data } = await http.post<User>("/users/login", body);
  return data;
}

/* 사용자 정보 수정 */
export async function updateUser(
  userId: string,
  body: UpdateUserBody
): Promise<User> {
  const { data } = await http.patch<User>(`/users/${userId}`, body);
  return data;
}

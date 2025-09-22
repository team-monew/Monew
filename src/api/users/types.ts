export type User = {
  id: string;
  email: string;
  nickname: string;
  createdAt: string;
};

export type UserId = string;

export type SignUpBody = { email: string; nickname: string; password: string };
export type LoginBody = { email: string; password: string };
export type UpdateUserBody = { nickname: string };

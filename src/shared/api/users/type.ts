export interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  nickname: string;
  password: string;
}

export interface UserResponse {
  id: number;
  email: string;
  nickname: string;
  createdAt: string;
}

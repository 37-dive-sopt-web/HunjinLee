// API 공통 응답 형식
export interface ApiRespionse<T> {
  success: boolean;
  code: string;
  message: string;
  data?: T;
}

// 회원 정보
export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  age: number;
}

// 로그인 요청
export interface LoginRequest {
  username: string;
  password: string;
}

// 로그인 응답
export interface LoginData {
  userId: string;
  message: string;
}

export type LoginResponse = ApiRespionse<LoginData>;

// 회원 가입 요청
export interface SignupRequest {
  username: string;
  password: string;
  name: string;
  email: string;
  age: number;
}

export type UserResponse = ApiRespionse<User>;

// 회원 정보 수정 요청
export interface UpdateRequest {
  name: string;
  email: string;
  age: number;
}

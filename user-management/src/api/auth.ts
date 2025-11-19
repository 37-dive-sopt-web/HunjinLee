// 로그인 / 회원가입 API 

import { apiClient } from './client';
import type { LoginRequest, LoginResponse, SignupRequest, ApiResponse } from "../types/user";

// loigin
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/auth/login', data);
  return response.data;
};

// sign
export const signup = async (data: SignupRequest): Promise<ApiResponse> => {
  const response = await apiClient.post<ApiResponse>("/users", data);
  return response.data;
};

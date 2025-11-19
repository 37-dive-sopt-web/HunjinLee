// 회원 정보 
import { apiClient } from "./client";
import type { User, UpdateRequest, ApiResponse } from "../types/user";

// 회원 정보 조회
export const getUserById = async (userId: number): Promise<ApiResponse<User>> => {
  const response = await apiClient.get<ApiResponse<User>>(`/users/${userId}`);
  return response.data;
};

// 회원 정보 수정
export const updateUser = async (userId: number, data: UpdateRequest): Promise<ApiResponse> => {
  const response = await apiClient.patch<ApiResponse>(`/users/${userId}`, data);
  return response.data;
};

// 회원 탈퇴
export const deleteUser = async (userId: number): Promise<ApiResponse> => {
  const response = await apiClient.delete<ApiResponse>(`/users/${userId}`);
  return response.data;
};
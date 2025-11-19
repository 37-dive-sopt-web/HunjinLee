import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    return config; // 요청 통과
  },
  (error) => {
    return Promise.reject(error); // 요청 에러 발생
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;  // 응답 통과
  },
  (error) => {
    console.error("API 에러:", error);
    return Promise.reject(error); // 에러 정보 표기
  }
);
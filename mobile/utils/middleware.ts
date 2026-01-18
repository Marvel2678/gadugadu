import axios from "axios";
import { AppConfig } from "./appConfig";
import { tokenStorage } from "./token.storage";

export const apiMiddleware = axios.create({
  baseURL: AppConfig.SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiMiddleware.interceptors.request.use(async (config) => {
  if (config.headers?.skipAuth) {
    return config;
  }
  const token = await tokenStorage.getAccessToken();
  if (token) {
    config.headers.withCredentials = true;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiMiddleware.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.headers?.skipAuth !== true
    ) {
      originalRequest._retry = true;
      const refreshToken = await tokenStorage.getRefreshToken();
      if (refreshToken) {
        try {
          const res = await axios.post(
            AppConfig.SERVER_URL + "/auth/refreshToken",
            {
              refreshToken,
            },
            { headers: { skipAuth: true } },
          );
          const { accessToken } = res.data;
          console.log("RESET");
          await tokenStorage.setAccessToken(accessToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiMiddleware(originalRequest);
        } catch (err) {
          console.error("Failed to refresh token:", err);
        }
      }
    } else if (
      error.response.status === 403 &&
      originalRequest.headers?.skipAuth !== true
    ) {
      await tokenStorage.clear();
    } else return Promise.reject(error);
  },
);

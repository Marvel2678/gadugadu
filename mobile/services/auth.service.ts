import { AppConfig } from "@/utils/appConfig";
import { apiMiddleware } from "@/utils/middleware";

export async function getMe() {
  const res = await apiMiddleware.get("/auth/me");
  return res.data;
}

export async function loginRequest(
  usernameOrEmail: string,
  password: string,
): Promise<{
  ok: boolean;
  accessToken: string;
  refreshToken: string;
  message?: string;
}> {
  const res = await apiMiddleware.post(
    "/auth/login",
    {
      email: usernameOrEmail,
      password,
    },
    { headers: { skipAuth: true } },
  );
  return res.data;
}

export async function registerRequest(
  name: string,
  username: string,
  email: string,
  password: string,
) {
  const res = await apiMiddleware.post(
    "/auth/register",
    {
      name,
      username,
      email,
      password,
    },
    { headers: { skipAuth: true } },
  );
  return res.data;
}

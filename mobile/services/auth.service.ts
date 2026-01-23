import { AppConfig } from "@/utils/appConfig";
import { apiMiddleware } from "@/utils/middleware";

export async function getMe() {
  const res = await apiMiddleware.get("/auth/me");
  return res.data;
}

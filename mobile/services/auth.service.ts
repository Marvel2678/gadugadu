import { AppConfig } from "@/utils/appConfig";
import { apiMiddleware } from "@/utils/middleware";

export async function getMe() {
  const res = await apiMiddleware.get("/auth/me");
  if (!res.data.ok) throw new Error("Unauthorized");
  return res.data;
}

import { AppConfig } from "@/utils/appConfig";

export async function getMe(token: string) {
  const res = await fetch(`${AppConfig.SERVER_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

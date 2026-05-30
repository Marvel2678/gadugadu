import { apiMiddleware } from "@/utils/middleware";
import axios from "axios";

export const RegisterPushToken = async (
  userId: number,
  pushToken: string,
  platform: string,
  device_id: string,
) => {
  try {
    const res = await apiMiddleware.post("/auth/registerPushToken", {
      userId,
      push_token: pushToken,
      platform,
      device_id,
    });
    return res;
  } catch (error) {
    console.error(
      "Error registering push token:",
      error.response?.message || error,
    );
    throw error;
  }
};

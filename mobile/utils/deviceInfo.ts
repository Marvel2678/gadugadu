import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

export async function getPushToken() {
  if (!Device.isDevice) return null;

  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") return null;

  const token = await Notifications.getExpoPushTokenAsync();
  return token.data;
}

export function getPlatform() {
  if (Platform.OS === "ios") return "iOS";
  if (Platform.OS === "android") return "Android";
  return "Unknown Platform";
}

export function deviceName() {
  return Device.deviceName || "Unknown Device";
}

import * as SecureStore from "expo-secure-store";

export const tokenStorage = {
  getAccessToken: () => SecureStore.getItemAsync("accessToken"),
  setAccessToken: (token: string) =>
    SecureStore.setItemAsync("accessToken", token),
  getRefreshToken: () => SecureStore.getItemAsync("refreshToken"),
  setRefreshToken: (token: string) =>
    SecureStore.setItemAsync("refreshToken", token),

  clear: async () => {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
  },
};

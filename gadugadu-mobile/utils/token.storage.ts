import * as SecureStore from "expo-secure-store";

export const tokenStorage = {
  getAccessToken: () => {
    SecureStore.getItemAsync("accessToken");
  },
  setAccessToken: (accessToken: string) => {
    SecureStore.setItemAsync("accessToken", accessToken);
  },
  getRefreshToken: () => SecureStore.getItemAsync("refreshToken"),
  setRefreshToken: (token: string) =>
    SecureStore.setItemAsync("refreshToken", token),

  clear: async () => {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
  },
};

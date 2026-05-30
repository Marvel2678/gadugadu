import * as SecureStore from "expo-secure-store";
import { deleteValueFor, getValueFor, save } from "./AsyncStorage";

export const tokenStorage = {
  getAccessToken: () => getValueFor("accessToken"),
  setAccessToken: (token: string) => save("accessToken", token),
  getRefreshToken: () => getValueFor("refreshToken"),
  setRefreshToken: (token: string) => save("refreshToken", token),

  clear: async () => {
    await deleteValueFor("accessToken");
    await deleteValueFor("refreshToken");
  },
};

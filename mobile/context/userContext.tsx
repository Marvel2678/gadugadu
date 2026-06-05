import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { getMe, loginRequest } from "@/services/auth.service";
import { reconnectAndSyncSocket, socket } from "@/utils/socket";
import { tokenStorage } from "@/utils/token.storage";
import { UserType } from "@/types/UserType";
import { apiMiddleware } from "@/utils/middleware";
import { deviceName, getPlatform, getPushToken } from "@/utils/deviceInfo";
import { RegisterPushToken } from "@/services/user.service";

type AuthContextType = {
  user: UserType | null;
  authStatus: "authenticated" | "unauthenticated" | "checking";
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [authStatus, setAuthStatus] = useState<
    "authenticated" | "unauthenticated" | "checking"
  >("checking");

  useEffect(() => {
    getter();
  }, []);

  const getter = async () => {
    try {
      setAuthStatus("checking");
      const token = await tokenStorage.getAccessToken();
      if (!token) {
        setUser(null);
        setAuthStatus("unauthenticated");
        return;
      }
      const res = await getMe();
      if (res.ok === false) {
        throw new Error("Unauthorized");
      }
      reconnectAndSyncSocket(res.user);
      console.log("REFRESHING SOCKET ✅");
      const me = res.user;
      try {
        const pushToken = await getPushToken();

        if (pushToken) {
          console.log("PUSH TOKEN:", pushToken);
          console.log("Platform: ", getPlatform());
          console.log("Device Name: ", deviceName());
          console.log("Device Name: ", deviceName());

          await RegisterPushToken(
            me.id,
            pushToken,
            getPlatform(),
            deviceName(),
          );
        }
      } catch (pushError) {
        console.error("Error fetching push token:", pushError.message);
      }
      setUser(me);
      setAuthStatus("authenticated");
    } catch (error) {
      console.log(error.status);
      if (error.status === 403) {
        console.log("REFRESH TOKEN EXPIRED");
      } else {
        console.log("GETTER ERROR:", error);
      }
      await logout();
      setAuthStatus("unauthenticated");
    }
  };

  const login = async (usernameOrEmail: string, password: string) => {
    setAuthStatus("checking");

    try {
      const { ok, refreshToken, accessToken, message } = await loginRequest(
        usernameOrEmail,
        password,
      );
      if (!ok) {
        console.error("TUTAJ");
        setAuthStatus("unauthenticated");
        throw new Error(message || "Nie można się zalogować", {
          cause: "LOGIN_FAILED",
        });
      }

      await tokenStorage.setRefreshToken(refreshToken);
      await tokenStorage.setAccessToken(accessToken);

      const res = await getMe();

      if (!res?.user) {
        throw new Error("Nie udało się pobrać użytkownika", {
          cause: "LOGIN_FAILED",
        });
      }

      const me = res.user;

      socket.auth = {
        token: accessToken,
      };

      socket.user_id = me.id;

      socket.connect();

      socket.on("connect", () => {
        console.log("SOCKET CONNECTED ✅");
      });

      setUser(me);
      setAuthStatus("authenticated");
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      setAuthStatus("unauthenticated");
      throw error;
    }
  };

  const logout = async () => {
    try {
      setAuthStatus("checking");
      socket.disconnect();
      await tokenStorage.clear();
      // const refreshToken = await tokenStorage.getRefreshToken();
      // const res = await apiMiddleware.post(
      //   "/auth/logout",
      //   {
      //     refreshToken: refreshToken,
      //   },
      //   {
      //     headers: {
      //       skipAuth: true,
      //     },
      //   },
      // );
      // if (res.status === 200) {
      //   console.log("LOGOUT SUCCESS:", res.data);
      // }
      setUser(null);
      setAuthStatus("unauthenticated");
    } catch (error) {
      console.log("LOGOUT ERROR:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, authStatus, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

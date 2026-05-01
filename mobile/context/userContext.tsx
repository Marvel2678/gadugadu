import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { getMe, loginRequest } from "@/services/auth.service";
import { reconnectAndSyncSocket, socket } from "@/utils/socket";
import { tokenStorage } from "@/utils/token.storage";
import { UserType } from "@/types/UserType";
import { apiMiddleware } from "@/utils/middleware";

type AuthContextType = {
  user: UserType | null;
  loading: boolean;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getter();
  }, []);

  const getter = async () => {
    try {
      setLoading(true);
      const token = await tokenStorage.getAccessToken();
      if (!token) {
        setUser(null);
        return;
      }
      const res = await getMe();
      if (res.ok === false) {
        return new Error("Unauthorized");
      }
      reconnectAndSyncSocket(res.user);
      console.log("REFRESHING SOCKET ✅");
      const me = res.user;
      setUser(me);
      setLoading(false);
    } catch (error) {
      console.log(error.status);
      if (error.status === 403) {
        console.log("REFRESH TOKEN EXPIRED");
      } else {
        console.log("GETTER ERROR:", error);
      }
      await logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (usernameOrEmail: string, password: string) => {
    setLoading(true);
    try {
      const { refreshToken, accessToken } = await loginRequest(
        usernameOrEmail,
        password,
      );
      await tokenStorage.setRefreshToken(refreshToken);
      await tokenStorage.setAccessToken(accessToken);
      const res = await getMe();
      if (!res?.user) {
        console.log("GETME RESPONSE:", res);
        throw new Error("Nie udało się pobrać użytkownika");
      }
      const me = res.user;
      socket.auth = { token: await tokenStorage.getAccessToken() };
      socket.user_id = me.id;
      socket.connect();
      console.log("SOCKET CONNECTED ✅");
      setUser(me);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
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
    } catch (error) {
      console.log("LOGOUT ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

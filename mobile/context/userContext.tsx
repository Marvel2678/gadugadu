import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { getMe } from "@/services/auth.service";
import { reconnectAndSyncSocket, socket } from "@/utils/socket";
import { tokenStorage } from "@/utils/token.storage";
import { UserType } from "@/types/UserType";
import { apiMiddleware } from "@/utils/middleware";

type AuthContextType = {
  user: UserType | null;
  loading: boolean;
  loggedBefore: boolean;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loggedBefore, setLoggedBefore] = useState<boolean>(false);

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
        setLoggedBefore(true);
      } else {
        console.log("GETTER ERROR:", error);
      }
      await logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (accessToken: string, refreshToken: string) => {
    try {
      setLoading(true);
      await tokenStorage.setRefreshToken(refreshToken);
      await tokenStorage.setAccessToken(accessToken);

      socket.auth = { token: await tokenStorage.getAccessToken() };
      socket.connect();
      const res = await getMe();

      const me = res.user;
      socket.user_id = me.id;
      console.log("SOCKET CONNECTED ✅");
      setUser(me);
    } catch (error) {
      console.log("CONTEXT LOGIN ERROR:", error);
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
    <AuthContext.Provider
      value={{ user, loading, loggedBefore, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

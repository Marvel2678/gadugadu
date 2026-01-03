import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { getMe } from "@/services/auth.service";
import { reconnectSocket, socket } from "@/utils/socket";
import { tokenStorage } from "@/utils/token.storage";
import { UserType } from "@/types/UserType";

type AuthContextType = {
  user: UserType | null;
  loading: boolean;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getter();
  }, []);

  const getter = async () => {
    try {
      const me = await getMe();
      reconnectSocket();
      console.log("REFRESHING SOCKET ✅");
      setUser(me);
    } catch (error) {
      await logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (accessToken: string, refreshToken: string) => {
    try {
      await tokenStorage.setRefreshToken(refreshToken);
      await tokenStorage.setAccessToken(accessToken);

      socket.auth = { token: await tokenStorage.getAccessToken() };
      socket.connect();

      const me = await getMe();

      setUser(me);
    } catch (error) {
      console.log("CONTEXT LOGIN ERROR:", error);
    }
  };

  const logout = async () => {
    // const
    socket.disconnect();
    await tokenStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

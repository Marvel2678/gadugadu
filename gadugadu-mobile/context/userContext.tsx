import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { getMe } from "@/services/auth.service";

type UserType = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
};

type AuthContextType = {
  user: UserType | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
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
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        return;
      }
      const me = await getMe(token);
      setUser(me);
    } catch (error) {
      await SecureStore.deleteItemAsync("token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (token: string) => {
    await SecureStore.setItemAsync("token", token);

    const me = await getMe(token);

    setUser(me);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

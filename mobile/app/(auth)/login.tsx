import { View, Text, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { socket } from "@/utils/socket";
import { AppConfig } from "@/utils/appConfig";
import { AuthContext } from "@/context/userContext";
import axios from "axios";
import { apiMiddleware } from "@/utils/middleware";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const router = useRouter();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { login } = useAuth();

  const Login = async () => {
    try {
      setErr("");
      if (!usernameOrEmail || !password) {
        return setErr("Nie wszystko jest wypełnione");
      }

      const res = await apiMiddleware.post(
        "/auth/login",
        {
          email: usernameOrEmail,
          password,
        },
        { headers: { skipAuth: true } },
      );

      const data = res.data;
      console.log(data);
      if (!data.ok) {
        return setErr(data.message || "Błąd logowania");
      }

      await login(data.accessToken, data.refreshToken);
    } catch (err: unknown) {
      setErr("Brak połączenia z serwerem");
      console.log(err);
      console.log(err?.response?.message);
    }
  };
  return (
    <View className="bg-brand3 flex-1 items-center justify-center p-6">
      <View className="bg-brand3 w-full max-w-md rounded-lg p-6">
        <Text className="mb-4 text-2xl text-white">Login</Text>
        <Text className="text-black">{err}</Text>
        <TextInput
          value={usernameOrEmail}
          onChangeText={setUsernameOrEmail}
          placeholder="Email albo nazwa użytkownika"
          className="mb-3 rounded bg-white p-2"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Hasło"
          className="mb-3 rounded bg-white p-2"
          textContentType="password"
        />
        <Button
          title="Zaloguj"
          onPress={() => {
            Login();
            socket.on("connect", () => {
              console.log("✅ connected", socket.id);
            });
          }}
          color="#F25912"
        />
        <View className="mt-3">
          <Button title="Register" onPress={() => router.push("/register")} />
        </View>
      </View>
    </View>
  );
}

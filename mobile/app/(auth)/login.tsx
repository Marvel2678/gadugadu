import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { socket } from "@/utils/socket";
import { apiMiddleware } from "@/utils/middleware";
import { useAuth } from "@/hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import MessageBubble from "@/components/MessageBubble";

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
    <SafeAreaView className="flex-1 bg-[#0f0f0f] px-6 justify-center">
      <View className="w-full max-w-md self-center bg-[#1a1a1a] rounded-2xl p-6 border border-[#333]">
        {/* LOGO / BRAND */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-[#E8DC2A]">GaduGadu</Text>
          <Text className="text-gray-400 mt-1">Witaj z powrotem 👋</Text>
        </View>

        {/* ERROR */}
        {err ? <Text className="text-red-400 mb-3">{err}</Text> : null}

        {/* INPUT EMAIL */}
        <View className="mb-3">
          <Text className="text-gray-400 mb-1 text-sm">
            Email lub nazwa użytkownika
          </Text>
          <TextInput
            value={usernameOrEmail}
            onChangeText={setUsernameOrEmail}
            placeholder="np. janek123"
            placeholderTextColor="#666"
            className="bg-[#262626] text-white rounded-xl px-4 py-3 border border-[#333]"
          />
        </View>

        {/* INPUT PASSWORD */}
        <View className="mb-4">
          <Text className="text-gray-400 mb-1 text-sm">Hasło</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor="#666"
            secureTextEntry
            className="bg-[#262626] text-white rounded-xl px-4 py-3 border border-[#333]"
          />
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          className="bg-[#E8DC2A] py-3 rounded-xl active:opacity-80"
          onPress={() => {
            Login();
            socket.on("connect", () => {
              console.log("✅ connected", socket.id);
            });
          }}
        >
          <Text className="text-center text-black font-semibold text-lg">
            Zaloguj się
          </Text>
        </TouchableOpacity>

        {/* REGISTER */}
        <TouchableOpacity
          className="mt-4"
          onPress={() => router.push("/register")}
        >
          <Text className="text-center text-gray-400">
            Nie masz konta?{" "}
            <Text className="text-[#E8DC2A]">Zarejestruj się</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

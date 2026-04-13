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
    <SafeAreaView className="flex-1 px-4 bg-background">
      {/* HEADER */}
      <View className="pt-6 pb-4">
        <Text className="text-3xl font-bold text-accent">GaduGadu</Text>
        <Text className="text-lg text-textSecondary">
          Zaloguj się do swojego konta
        </Text>
      </View>

      {/* CHAT */}
      <View className="flex-1 justify-end pb-6">
        <View className="flex flex-col">
          {/* Bot message */}
          <MessageBubble
            text="Podaj email albo nazwę użytkownika 👇"
            isUser={false}
          />

          {/* INPUT jako bubble */}
          <View className="self-end w-[80%] bg-white rounded-2xl px-4 py-2 mb-2">
            <TextInput
              value={usernameOrEmail}
              onChangeText={setUsernameOrEmail}
              placeholder="Email / username"
              placeholderTextColor="#666"
            />
          </View>

          {/* Bot message */}
          <MessageBubble text="Teraz wpisz hasło 🔒" isUser={false} />

          {/* PASSWORD INPUT */}
          <View className="self-end w-[80%] bg-white rounded-2xl px-4 py-2 mb-2">
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Hasło"
              secureTextEntry
              placeholderTextColor="#666"
            />
          </View>

          {/* ERROR jako wiadomość */}
          {err ? <MessageBubble text={err} isUser={false} /> : null}

          {/* ACTION jako wiadomość usera */}
          <TouchableOpacity
            className="self-end max-w-[80%] px-4 py-3 rounded-2xl mt-2 bg-accent"
            onPress={() => {
              Login();
              socket.on("connect", () => {
                console.log("✅ connected", socket.id);
              });
            }}
            activeOpacity={0.8}
          >
            <Text className="text-black font-semibold text-right">
              Zaloguj mnie
            </Text>
          </TouchableOpacity>

          {/* REGISTER jako opcja */}
          <TouchableOpacity
            className="self-start mt-4"
            onPress={() => router.push("/register")}
          >
            <Text className="text-textSecondary">
              Nie masz konta?{" "}
              <Text className="text-accent">Zarejestruj się</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

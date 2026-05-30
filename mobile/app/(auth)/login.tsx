import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginRequest } from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";

export default function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { login, loading } = useAuth();

  const [submitting, setSubmitting] = useState(false);

  const LoginFn = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setErr("");

      if (!usernameOrEmail || !password) {
        return setErr("Nie wszystko jest wypełnione");
      }

      await login(usernameOrEmail, password);
    } catch (err) {
      if (err instanceof Error && err.cause === "LOGIN_FAILED") {
        setErr(err.message);
      } else {
        console.log(err);
        setErr("Nie można się zalogować");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (submitting) {
    return (
      <SafeAreaView className="flex-1 bg-[#0f0f0f] px-6 justify-center">
        <Text className="text-center text-gray-400">Ładowanie...</Text>
      </SafeAreaView>
    );
  }

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
          onPress={(e) => {
            LoginFn(e);
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

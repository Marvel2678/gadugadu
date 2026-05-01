import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { EmailValidator, PasswordValidator } from "@/utils/validators";
import { apiMiddleware } from "@/utils/middleware";
import { SafeAreaView } from "react-native-safe-area-context";
import Login from "./login";
import { socket } from "@/utils/socket";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const register = async () => {
    try {
      setErr("");
      if (!name || !username || !email || !password) {
        return setErr("Nie wszystko jest wypełnione");
      }
      const EmailValidation = EmailValidator(email);

      if (EmailValidation !== null) {
        return setErr(EmailValidation);
      }

      // const PasswordValidation = PasswordValidator(password);

      // if (PasswordValidation !== null) {
      //   return setErr(PasswordValidation);
      // }

      const res = await apiMiddleware.post(
        "/auth/register",
        {
          name,
          username,
          email,
          password,
        },
        { headers: { skipAuth: true } },
      );

      const data = await res.data;

      if (!data.ok) {
        return setErr(data.message || "Błąd rejestracji");
      }

      router.replace("/(auth)/login");
    } catch (err) {
      setErr("Brak połączenia z serwerem");
      console.log(err);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0f0f0f] px-6 justify-center">
      <View className="w-full max-w-md self-center bg-[#1a1a1a] rounded-2xl p-6 border border-[#333]">
        {/* LOGO / BRAND */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-accent">GaduGadu</Text>
          <Text className="text-gray-400 mt-1">Dołącz do nas </Text>
        </View>

        {/* ERROR */}
        {err ? <Text className="text-red-400 mb-3">{err}</Text> : null}

        {/* INPUT NAME */}
        <View className="mb-3">
          <Text className="text-gray-400 mb-1 text-sm">Imię i nazwisko</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Jan Kowalski"
            placeholderTextColor="#666"
            className="bg-[#262626] text-white rounded-xl px-4 py-3 border border-[#333]"
          />
        </View>
        {/* INPUT USERNAME */}
        <View className="mb-3">
          <Text className="text-gray-400 mb-1 text-sm">Nazwa użytkownika</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="jan_kowalski"
            placeholderTextColor="#666"
            className="bg-[#262626] text-white rounded-xl px-4 py-3 border border-[#333]"
          />
        </View>

        {/* INPUT EMAIL */}
        <View className="mb-4">
          <Text className="text-gray-400 mb-1 text-sm">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="jan.kowalski@example.com"
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
            register();
          }}
        >
          <Text className="text-center text-black font-semibold text-lg">
            Stwórz konto
          </Text>
        </TouchableOpacity>

        {/* Login */}
        <TouchableOpacity
          className="mt-4"
          onPress={() => router.push("/login")}
        >
          <Text className="text-center text-gray-400">
            Wracasz do nas? <Text className="text-[#E8DC2A]">Zaloguj się</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

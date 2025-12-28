import { View, Text, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { socket } from "@/utils/socket";

export default function Login() {
  const router = useRouter();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="bg-brand3 flex-1 items-center justify-center p-6">
      <View className="bg-brand2 w-full max-w-md rounded-lg p-6">
        <Text className="mb-4 text-2xl text-white">Login</Text>
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
        />
        <Button
          title="Zaloguj"
          onPress={() => {
            router.push("/dashboard");
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

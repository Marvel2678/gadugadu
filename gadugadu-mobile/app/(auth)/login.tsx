import { View, Text, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { socket } from "@/utils/socket";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  return (
    <View className="bg-brand2 flex-1 items-center justify-center p-6">
      <View className="bg-brand4 w-full max-w-md rounded-lg p-6">
        <Text className="mb-4 text-2xl text-white">Login</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
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

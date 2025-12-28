import { Stack } from "expo-router";
import "../global.css";
import { useEffect } from "react";
import { socket } from "@/utils/socket";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("✅ connected", socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#E8DC2A" barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: false }} />;
    </SafeAreaProvider>
  );
}

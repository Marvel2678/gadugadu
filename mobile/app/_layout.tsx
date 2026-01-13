import { Redirect, Stack } from "expo-router";
import "../global.css";
import { useEffect } from "react";
import { socket } from "@/utils/socket";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "@/context/userContext";
import { useAuth } from "@/hooks/useAuth";
import { ChatProvider } from "@/context/chatContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ChatProvider>
          <StatusBar barStyle="dark-content" />
          <Stack screenOptions={{ headerShown: false }} />
        </ChatProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

import { Stack } from "expo-router";
import "../global.css";
import { useEffect } from "react";
import { socket } from "@/utils/socket";

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
  return <Stack screenOptions={{ headerShown: false }} />;
}

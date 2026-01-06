import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import ChatNavbar from "@/components/elements/navbars/ChatNavbar";
import "@/global.css";

const ChatsLayout = () => {
  return (
    <SafeAreaView className="flex-1">
      <ChatNavbar />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
};

export default ChatsLayout;

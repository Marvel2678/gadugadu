import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import ChatNavbar from "@/components/elements/navbars/ChatNavbar";

const ChatsLayout = () => {
  return (
    <SafeAreaView>
      <ChatNavbar />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
};

export default ChatsLayout;

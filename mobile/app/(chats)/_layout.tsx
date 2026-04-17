import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, Slot } from "expo-router";
import ChatNavbar from "@/components/elements/navbars/ChatNavbar";
import "@/global.css";
import { StatusBar, Text, View } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import MessageBox from "@/components/MessageBox";
import SendMessageFooter from "@/components/SendMessageFooter";

const ChatsLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-brand3 items-center justify-center">
        <Text className="text-white text-xl">Ładowanie...</Text>
      </SafeAreaView>
    );
  }
  if (user === null) {
    return <Redirect href="/(auth)/login" withAnchor={true} />;
  }
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView className="flex-1 bg-background">
        <ChatNavbar />
        <View className="flex-1">
          <Slot />
        </View>
      </SafeAreaView>
    </>
  );
};

export default ChatsLayout;

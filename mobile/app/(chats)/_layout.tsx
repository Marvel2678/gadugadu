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
  const { authStatus } = useAuth();
  if (authStatus === "checking") {
    return <Text>Loading...</Text>;
  }
  if (authStatus === "unauthenticated") {
    return <Redirect href="/login" withAnchor={true} />;
  }
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1">
          <Slot />
        </View>
      </SafeAreaView>
    </>
  );
};

export default ChatsLayout;

import { View, Text } from "react-native";
import React from "react";
import { UserType } from "@/types/UserType";

export default function ChatNavbar(user: { user: UserType }) {
  return (
    <View>
      <View className="w-full bg-brand2 py-7 flex items-center justify-between flex-row">
        <Text className="text-white text-xl font-bold">
          {user.user.username}
        </Text>
      </View>
    </View>
  );
}

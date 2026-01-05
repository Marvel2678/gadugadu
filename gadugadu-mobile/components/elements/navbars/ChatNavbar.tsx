import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { UserType } from "@/types/UserType";
import { useChats } from "@/hooks/useChats";
import { useLocalSearchParams } from "expo-router";
import defaultProfileImage from "@/assets/images/default_profile_image.jpg";

export default function ChatNavbar() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getChatById } = useChats();
  const chat = getChatById(parseInt(id));
  const user = chat?.other_users[0] as UserType;
  return (
    <View>
      <View className="w-full bg-brand2 p-7 flex items-center justify-between flex-row">
        <Text className="text-white text-xl font-bold">{user.username}</Text>
        <View>
          <Image
            source={defaultProfileImage}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
        </View>
      </View>
    </View>
  );
}

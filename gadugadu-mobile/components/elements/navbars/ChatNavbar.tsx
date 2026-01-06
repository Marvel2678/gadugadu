import { View, Text, Image, Touchable, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { UserType } from "@/types/UserType";
import { useChats } from "@/hooks/useChats";
import { useLocalSearchParams, useRouter } from "expo-router";
import defaultProfileImage from "@/assets/images/default_profile_image.jpg";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function ChatNavbar() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getChatById } = useChats();
  const chat = getChatById(parseInt(id));
  const user = chat?.other_users[0] as UserType;

  const handleBackToChat = () => {
    router.back();
  };
  return (
    <View>
      <View className="w-full bg-brand2 p-9 flex items-center justify-between flex-row">
        <View className="flex flex-row flex-1 items-center">
          <TouchableOpacity onPress={handleBackToChat}>
            <Icon name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold ml-4">
            {user.username}
          </Text>
        </View>
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

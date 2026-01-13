import { View, Text, Image, Touchable, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { UserType } from "@/types/UserType";
import { useChats } from "@/hooks/useChats";
import { useLocalSearchParams, useRouter } from "expo-router";
import defaultProfileImage from "@/assets/images/default_profile_image.jpg";
import { FontAwesome } from "@react-native-vector-icons/fontawesome";

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
      <View className="w-full bg-brand2 px-4 py-3 flex items-center justify-between flex-row">
        <View className="flex flex-row flex-1 items-center">
          <TouchableOpacity onPress={handleBackToChat}>
            <FontAwesome name="arrow-left" size={20} color="#E8DC2A" />
          </TouchableOpacity>
          <View className="ml-4">
            <Text className="text-gray-200 text-lg font-semibold">
              {user.name}
            </Text>
            <View className="flex flex-row items-center mt-1">
              <View
                className={`${user.online ? "bg-green-500" : "bg-gray-500"} w-2 h-2 rounded-full mr-2 `}
              ></View>
              <Text
                className={`${user.online ? "text-green-500" : "text-gray-500"} text-xs`}
              >
                {user.online ? "Aktywny" : "Nieaktywny"}
              </Text>
            </View>
          </View>
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

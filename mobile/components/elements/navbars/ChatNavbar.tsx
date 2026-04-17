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
    <View
      className="flex-row items-center px-4 py-3"
      style={{
        backgroundColor: "#1a1a1a",
        borderBottomWidth: 1,
        borderBottomColor: "#333",
      }}
    >
      {/* BACK */}
      <TouchableOpacity onPress={() => router.back()} className="mr-3">
        <FontAwesome name="arrow-left" size={20} color="#E8DC2A" />
      </TouchableOpacity>

      {/* AVATAR */}
      <View className="relative mr-3">
        <Image
          source={user?.avatar ? { uri: user.avatar } : defaultProfileImage}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
          }}
        />

        {/* STATUS DOT */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: user?.online ? "#22c55e" : "#555",
            borderWidth: 2,
            borderColor: "#1a1a1a",
          }}
        />
      </View>

      {/* USER INFO */}
      <View className="flex-1">
        <Text className="text-white text-base font-semibold">
          {user?.username}
        </Text>

        <Text className="text-[#9ca3af] text-xs mt-1">
          {user?.online ? "Aktywny teraz" : "Offline"}
        </Text>
      </View>

      {/* ACTIONS (opcjonalne) */}
      <View className="flex-row gap-4">
        <FontAwesome name="phone" size={18} color="#9ca3af" />
        <FontAwesome name="ellipsis-v" size={18} color="#9ca3af" />
      </View>
    </View>
  );
}

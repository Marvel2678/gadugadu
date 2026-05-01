import { ChatType } from "@/types/ChatsType";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default function ChatListElement({ chat }: { chat: ChatType }) {
  const router = useRouter();
  console.log("User in chat:", chat.other_users[0]);
  const user = chat.other_users[0]; // Assuming one-on-one chat for simplicity
  const handlePress = () => {
    router.push({
      pathname: "/(chats)/[id]",
      params: { id: String(chat.conversation_id) },
    });
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      className="flex-row items-center p-3 mb-2 rounded-xl"
      style={{
        backgroundColor: "#1a1a1a",
        borderWidth: 1,
        borderColor: "#333",
      }}
    >
      {/* AVATAR */}
      <View className="relative mr-3">
        <Image
          source={
            user?.avatar && user.avatar !== null
              ? { uri: user.avatar }
              : require("@/assets/images/default_profile_image.jpg")
          }
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
          }}
        />

        {/* ONLINE STATUS */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: user?.online ? "#22c55e" : "#555",
            borderWidth: 2,
            borderColor: "#1a1a1a",
          }}
        />
      </View>

      {/* TEXT */}
      <View className="flex-1">
        <Text className="text-white text-base font-semibold">
          {user.username}
        </Text>

        <Text className="text-[#9ca3af] text-sm mt-1">
          {user?.online ? "Aktywny teraz" : "Offline"}
        </Text>
      </View>

      {/* OPTIONAL TIME / ARROW */}
      <Text className="text-[#9ca3af] text-xs">›</Text>
    </TouchableOpacity>
  );
}

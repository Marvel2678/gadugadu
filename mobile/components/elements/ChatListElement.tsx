import { ChatType } from "@/types/ChatsType";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

export default function ChatListElement({ chat }: { chat: ChatType }) {
  const router = useRouter();
  const user = chat.other_users[0]; // Assuming one-on-one chat for simplicity
  const handlePress = () => {
    router.push({
      pathname: "/(chats)/[id]",
      params: { id: String(chat.conversation_id) },
    });
  };
  return (
    <TouchableOpacity
      className="p-4 bg-white mb-2 rounded-xl"
      onPress={handlePress}
    >
      <Text className="text-lg">{user.username}</Text>
      <Text className="text-sm text-gray-500">
        {user && user.online ? "Aktywny" : "Nieaktywny"}
      </Text>
    </TouchableOpacity>
  );
}

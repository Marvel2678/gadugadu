import { View, Text } from "react-native";

export default function ChatListElement({ chat }) {
  return (
    <View className="p-4 bg-white mb-2 rounded-xl">
      <Text className="text-lg">{chat.name}</Text>
      <Text className="text-sm text-gray-500">
        {chat.active ? "Aktywny" : "Nieaktywny"}
      </Text>
    </View>
  );
}

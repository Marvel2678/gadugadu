import { View, Text } from "react-native";

export default function UserListElement({ user }) {
  return (
    <View className="p-4 bg-white mb-2 rounded-xl">
      <Text className="text-lg">{user.name}</Text>
      <Text className="text-sm text-gray-500">
        {user.active ? "Aktywny" : "Nieaktywny"}
      </Text>
    </View>
  );
}

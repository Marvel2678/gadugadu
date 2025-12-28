import UserListElement from "@/components/elements/UserListElement";
import { View, Text, FlatList } from "react-native";

export default function Dashboard() {
  const users = [
    { id: 1, name: "user1", active: true },
    { id: 2, name: "user2", active: true },
    { id: 3, name: "user3", active: false },
  ];

  return (
    <View className="flex-1 bg-brand2 py-4">
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <UserListElement key={item.id} user={item} />}
      />
    </View>
  );
}

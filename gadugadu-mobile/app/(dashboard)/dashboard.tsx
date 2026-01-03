import UserListElement from "@/components/elements/UserListElement";
import { AuthContext } from "@/context/userContext";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { View, Text, FlatList } from "react-native";

export default function Dashboard() {
  const router = useRouter();
  const users = [
    { id: 1, name: "user1", active: true },
    { id: 2, name: "user2", active: true },
    { id: 3, name: "user3", active: false },
  ];

  const { user } = useAuth();

  console.log(user);

  if (user === null) {
    return router.replace("/(auth)/login");
  }

  return (
    <View className="flex-1 bg-brand3 py-4">
      <Text className="text-brand3 text-xl p-4 my-10">USER: {user.name}</Text>
      <Text className="text-brand3 text-xl p-4 my-10">
        LOOOOOOOOOOOOOOOOOOOOOL
      </Text>
      <Text className="text-brand3 text-xl p-4 my-10">
        LOOOOOOOOOOOOOOOOOOOOOL
      </Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <UserListElement key={item.id} user={item} />}
      />
    </View>
  );
}

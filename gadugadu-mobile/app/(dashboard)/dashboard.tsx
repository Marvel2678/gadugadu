import ChatListElement from "@/components/elements/ChatListElement";
import { useAuth } from "@/hooks/useAuth";
import { ChatType } from "@/types/ChatsType";
import { AppConfig } from "@/utils/appConfig";
import { apiMiddleware } from "@/utils/middleware";
import { socket } from "@/utils/socket";
import axios from "axios";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";

export default function Dashboard() {
  const router = useRouter();
  const [chats, setChats] = useState<ChatType[]>([]);
  useEffect(() => {
    getChats();
  }, []);

  const getChats = async () => {
    try {
      const res = await apiMiddleware.get(
        AppConfig.SERVER_URL + "/conversation/getConversations"
      );
      const data = res.data;
      console.log("CHATS:", data);
      setChats(data.conversations);
      socket.emit("user:sync", (data) => {
        console.log("USER SYNC EVENT:", data);
      });
    } catch (error) {
      console.log(error);
      console.log("Błąd podczas pobierania czatów");
      // console.log(error.response?.data);
    }
  };
  // const users = [
  //   { id: 1, name: "user1", active: true },
  //   { id: 2, name: "user2", active: true },
  //   { id: 3, name: "user3", active: false },
  // ];

  const { user, loading } = useAuth();

  console.log(user);

  if (user === null) {
    return router.replace("/(auth)/login");
  }
  if (loading) {
    return (
      <View className="flex-1 bg-brand3 items-center justify-center">
        <Text className="text-white text-xl">Ładowanie...</Text>
      </View>
    );
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
        data={chats}
        keyExtractor={(item) => item.conversation_id.toString()}
        renderItem={({ item }) => (
          <ChatListElement key={item.conversation_id} chat={item} />
        )}
      />
    </View>
  );
}

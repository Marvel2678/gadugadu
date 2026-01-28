import ChatListElement from "@/components/elements/ChatListElement";
import CreateChatModal from "@/components/elements/modals/CreateChatModal";
import { useAuth } from "@/hooks/useAuth";
import { useChats } from "@/hooks/useChats";
import { ChatType } from "@/types/ChatsType";
import { AppConfig } from "@/utils/appConfig";
import { apiMiddleware } from "@/utils/middleware";
import { socket } from "@/utils/socket";
import axios from "axios";
import { useRouter } from "expo-router";
import { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

export default function Dashboard() {
  const router = useRouter();
  const { chats, setChats } = useChats();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getChats();
    const onUserOnline = (data) => {
      handleOnline(data.user_id);
    };

    const onUserOffline = (data) => {
      handleOffline(data.user_id);
    };

    socket.on("user:online", onUserOnline);
    socket.on("user:offline", onUserOffline);

    return () => {
      socket.off("user:online", onUserOnline);
      socket.off("user:offline", onUserOffline);
    };
  }, []);
  const handleOnline = (user_id) => {
    setChats((prevChats) => {
      const updated = prevChats.map((chat) => ({
        ...chat,
        other_users: chat.other_users.map((user) =>
          user.user_id === user_id ? { ...user, online: true } : user,
        ),
      }));
      return updated;
    });
    console.log("CHATY: ", chats[0]);
    console.log("STATUS UPDATE ONLINE:", user_id);
  };
  const handleOffline = (user_id) => {
    setChats((prevChats) => {
      const updated = prevChats.map((chat) => ({
        ...chat,
        other_users: chat.other_users.map((user) =>
          user.user_id === user_id ? { ...user, online: false } : user,
        ),
      }));
      // console.log(updated[0].other_users);
      return updated;
    });
    console.log("STATUS UPDATE OFFLINE:", user_id);
  };

  const getChats = async () => {
    try {
      const res = await apiMiddleware.get(
        AppConfig.SERVER_URL + "/conversation/getConversations",
      );
      console.log(res);
      const data = res.data;
      setChats(data.conversations);
    } catch (error) {
      console.log(error);
      console.log("Błąd podczas pobierania czatów");
    }
  };

  const { user, loading } = useAuth();

  console.log(user);

  if (user === null) {
    return router.replace("/(auth)/login");
  }
  if (loading) {
    return (
      <View className="flex-1 bg-brand3 items-center justify-center">
        <Text className="text-black text-xl">Ładowanie...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-brand3 py-4">
      <Text className="text-black text-xl p-4">USER: {user.name}</Text>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.conversation_id.toString()}
        renderItem={({ item }) => (
          <ChatListElement key={item.conversation_id} chat={item} />
        )}
      />
      <TouchableOpacity onPress={() => setOpen(true)}>
        <Text style={{ fontSize: 24 }}>＋</Text>
      </TouchableOpacity>
      {open && <CreateChatModal onClose={() => setOpen(false)} />}
    </View>
  );
}

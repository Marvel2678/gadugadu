import ChatListElement from "@/components/elements/ChatListElement";
import CreateChatModal from "@/components/elements/modals/CreateChatModal";
import { useAuth } from "@/hooks/useAuth";
import { useChats } from "@/hooks/useChats";
import { getChatsRequest } from "@/services/chats.service";
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
import { SafeAreaView } from "react-native-safe-area-context";

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
      const data = await getChatsRequest();
      console.log(data);
      setChats(data.conversations);
    } catch (error) {
      console.log(error);
      console.log("Błąd podczas pobierania czatów");
    }
  };

  const { user, authStatus } = useAuth();

  console.log(user);

  if (authStatus === "unauthenticated") {
    return router.replace("/(auth)/login");
  }
  if (authStatus === "checking") {
    return (
      <View className="flex-1 bg-brand3 items-center justify-center">
        <Text className="text-black text-xl">Ładowanie...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background px-4 pt-4">
      {/* USER LIST */}
      <FlatList
        data={chats}
        keyExtractor={(item) => item.conversation_id.toString()}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        renderItem={({ item }) => <ChatListElement chat={item} />}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center mt-20">
            <Text className="text-textSecondary text-lg">Brak rozmów 🐝</Text>
            <Text className="text-textSecondary text-sm mt-2">
              Rozpocznij pierwszą konwersację
            </Text>
          </View>
        }
      />

      {/* FAB */}
      <TouchableOpacity
        onPress={() => setOpen(true)}
        activeOpacity={0.8}
        className="absolute bottom-8 right-6 w-[64px] h-[64px] rounded-full items-center justify-center"
        style={{
          backgroundColor: "#E8DC2A",
          shadowColor: "#E8DC2A",
          shadowOpacity: 0.4,
          shadowRadius: 10,
        }}
      >
        <Text className="text-black text-3xl font-bold">＋</Text>
      </TouchableOpacity>

      {/* MODAL */}
      <CreateChatModal visible={open} onClose={() => setOpen(false)} />
    </SafeAreaView>
  );
}

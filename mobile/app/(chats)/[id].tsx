import MessageBox from "@/components/MessageBox";
import SendMessageFooter from "@/components/SendMessageFooter";
import { useAuth } from "@/hooks/useAuth";
import { MessageType } from "@/types/MessageType";
import { AppConfig } from "@/utils/appConfig";
import { apiMiddleware } from "@/utils/middleware";
import { socket } from "@/utils/socket";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Text, View, ScrollView, FlatList } from "react-native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const Chat = () => {
  const { id: conversation_id } = useLocalSearchParams();
  const listRef = useRef<FlatList>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { user } = useAuth();
  useEffect(() => {
    socket.emit("conversation:join", conversation_id);
    console.log("JOINED✅");
    getMessages();
    return () => {
      socket.emit("conversation:leave", conversation_id);
    };
  }, [conversation_id]);
  useEffect(() => {
    listRef.current?.scrollToEnd({ animated: true });
  }, [messages]);
  useEffect(() => {
    const handleNewMessage = ({ message, temp_id }: any) => {
      setMessages((prev) => prev.map((m) => (m.id === temp_id ? message : m)));
    };

    socket.on("message:new", ({ message, temp_id }) =>
      handleNewMessage({ message, temp_id })
    );

    return () => {
      socket.off("message:new", handleNewMessage);
    };
  }, []);

  const handleSend = async (text: string) => {
    const temp_id = `temp_${Date.now()}`;
    try {
      console.log("CONVERSATION_ID", conversation_id);
      socket.emit("message:send", {
        conversation_id: conversation_id,
        type: "text",
        text: text,
        temp_id: temp_id,
      });
      console.log("SENDED");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const getMessages = async () => {
    try {
      const res = await apiMiddleware.get(
        AppConfig.SERVER_URL + `/message/getMessages/${conversation_id}`
      );
      setMessages(res.data.messages);
      console.log("MESSAGES", res.data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <FlatList
        className="flex-1 m-4"
        showsVerticalScrollIndicator={false}
        inverted
        ref={listRef}
        data={[...messages].reverse()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MessageBox key={item.id} message={item} />}
      ></FlatList>
      <SendMessageFooter onSend={handleSend} />
    </View>
  );
};

export default Chat;

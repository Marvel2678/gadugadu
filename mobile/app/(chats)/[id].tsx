import ChatNavbar from "@/components/elements/navbars/ChatNavbar";
import MessageBox from "@/components/MessageBox";
import SendMessageFooter from "@/components/SendMessageFooter";
import { useAuth } from "@/hooks/useAuth";
import { messageService } from "@/services/message.service";
import { MessageType } from "@/types/MessageType";
import { AppConfig } from "@/utils/appConfig";
import { apiMiddleware } from "@/utils/middleware";
import { socket } from "@/utils/socket";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Text, View, ScrollView, FlatList } from "react-native";

const Chat = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const conversation_id = parseInt(id);
  const listRef = useRef<FlatList>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    try {
      const init = async () => {
        socket.emit("conversation:join", { conversation_id });
        await getMessages();
        console.log("JOINED✅");
      };
      init();
      return () => {
        socket.emit("conversation:leave", { conversation_id });
      };
    } catch (error) {
      console.log("Error in getting messages");
    }
  }, [conversation_id]);
  useEffect(() => {
    if (messages.length > 0)
      listRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
  }, [messages]);
  useEffect(() => {
    const OnNewMessage = ({
      message,
      temp_id,
    }: {
      message: MessageType;
      temp_id: string;
    }) => {
      handleNewMessage({ message, temp_id });
    };
    socket.on("message:new", OnNewMessage);

    return () => {
      socket.off("message:new", OnNewMessage);
    };
  }, []);

  const handleNewMessage = ({
    message,
    temp_id,
  }: {
    message: MessageType;
    temp_id: string;
  }) => {
    setMessages((prev) => {
      const exists = prev.some((m) => m.id.toString() === temp_id); // checking is element exists in table

      if (exists) {
        return prev.map((m) => (m.id.toString() === temp_id ? message : m));
      }

      return [message, ...prev];
    });
  };

  const handleSend = async (text: string) => {
    const temp_id = `temp_${Date.now()}`.toString();
    try {
      await messageService.sendMessage(conversation_id, text, temp_id);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const getMessages = async () => {
    try {
      const data = await messageService.getMessages(conversation_id);
      setMessages(data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <>
      <ChatNavbar conversation_id={conversation_id} />
      <View className="flex-1 bg-background">
        {/* MESSAGES */}
        <FlatList
          className="flex-1 m-4"
          showsVerticalScrollIndicator={false}
          inverted
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MessageBox key={item.id} message={item} />}
        ></FlatList>
        {/* SENDING INPUT */}
        <SendMessageFooter onSend={handleSend} />
      </View>
    </>
  );
};

export default Chat;

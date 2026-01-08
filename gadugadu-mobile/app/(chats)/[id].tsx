import MessageBox from "@/components/MessageBox";
import { useAuth } from "@/hooks/useAuth";
import { MessageType } from "@/types/MessageType";
import { apiMiddleware } from "@/utils/middleware";
import { useEffect, useRef, useState } from "react";
import { Text, View, ScrollView, FlatList } from "react-native";

const Chat = () => {
  const listRef = useRef<FlatList>(null);
  const messages = useState<MessageType[]>([]);

  
  useEffect(() => {

    listRef.current?.scrollToEnd({ animated: true });
  }, [messages]);


  const getMessages = async () => {
    try {
      const res = await apiMiddleware.get()

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
    </View>
  );
};

export default Chat;

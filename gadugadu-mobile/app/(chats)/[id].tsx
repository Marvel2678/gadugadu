import MessageBox from "@/components/MessageBox";
import { useAuth } from "@/hooks/useAuth";
import { Text, View } from "react-native";

const Chat = () => {
  const { user } = useAuth();

  const messages = [
    { id: 1, sender_id: 1, text: "Hello!" },
    { id: 2, sender_id: 2, text: "Hi there!" },
    { id: 3, sender_id: 1, text: "How are you?" },
  ];

  return (
    <View className="flex flex-1 bg-red-400">
      {messages.map((message) => (
        <MessageBox key={message.id} message={message} />
      ))}
    </View>
  );
};

export default Chat;

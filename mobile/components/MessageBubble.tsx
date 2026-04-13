import { Text, View } from "react-native";

const MessageBubble = ({ text, isUser }) => {
  return (
    <View
      className={`max-w-[80%] p-3 rounded-2xl mb-2 ${
        isUser ? "bg-[#E8DC2A] self-end" : "bg-[#262626] self-start"
      }`}
    >
      <Text className={isUser ? "text-black" : "text-white"}>{text}</Text>
    </View>
  );
};

export default MessageBubble;

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { MessageType } from "@/types/MessageType";
import { useAuth } from "@/hooks/useAuth";

const MessageBox = ({ message }: { message: MessageType }) => {
  const { user } = useAuth();
  const isMe = user?.id === Number(message.sender_id);

  return (
    <View
      className={`max-w-[75%] px-4 py-3 rounded-2xl mb-2 ${
        isMe ? "self-end" : "self-start"
      }`}
      style={{
        backgroundColor: isMe ? "#E8DC2A" : "#262626",
      }}
    >
      <Text
        className="text-base"
        style={{
          color: isMe ? "#000" : "#fff",
          fontWeight: isMe ? "600" : "400",
        }}
      >
        {message.text}
      </Text>
    </View>
  );
};
export default MessageBox;

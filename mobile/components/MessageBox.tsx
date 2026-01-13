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
  const isMe = user?.id === message.sender_id;

  return (
    <View
      className={`max-w-[75%] mb-2 rounded-2xl px-4 py-2 my-4 ${isMe ? "self-end bg-brand1" : "self-start bg-[#777777]"}`}
    >
      <Text
        className={`text-base
          ${isMe ? "text-black font-semibold" : "text-gray-800"}"`}
      >
        {message.text}
      </Text>
    </View>
  );
};

export default MessageBox;

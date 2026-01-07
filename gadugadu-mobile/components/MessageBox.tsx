import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { MessageType } from "@/types/MessageType";

const MessageBox = (message: { message: MessageType }) => {
  const handleSendMessage = async () => {
    // Logic to send message
    console.log("Send Message");
  };
  return (
    <View className="w-2/3 mb-2 bg-brand2 rounded-lg px-4 py-2">
      <Text className="text-white">{message.message.text}</Text>
    </View>
  );
};

export default MessageBox;

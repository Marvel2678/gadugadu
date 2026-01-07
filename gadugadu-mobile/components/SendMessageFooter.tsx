import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { FontAwesome } from "@react-native-vector-icons/fontawesome";

const SendMessageFooter = () => {
  const handleSendMessage = async () => {
    // Logic to send message
    console.log("Send Message");
  };
  return (
    <View className="w-full flex-row items-center bg-brand3 px-3 py-2">
      <TextInput
        className="flex-1 h-full bg-brand2 rounded-lg px-4 py-2 placeholder:text-white mr-2"
        placeholder="Type a message..."
      />
      <TouchableOpacity className="px-3 py-2 " onPress={handleSendMessage}>
        <FontAwesome name="send" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default SendMessageFooter;

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
  return (
    <View className="w-full bg-brand3 px-3 py-2 border-t border-black/10">
      <View className="flex-row items-center bg-brand2 rounded-2xl px-3 py-2">
        <TextInput
          className="flex-1 text-black text-base"
          placeholder="Type a message..."
          placeholderTextColor="#555"
        />

        <TouchableOpacity className="ml-2 bg-brand1 p-2 rounded-full">
          <FontAwesome name="send" size={16} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SendMessageFooter;

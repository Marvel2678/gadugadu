import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@react-native-vector-icons/fontawesome";
import { useAuth } from "@/hooks/useAuth";
import { apiMiddleware } from "@/utils/middleware";
import { AppConfig } from "@/utils/appConfig";
import { useLocalSearchParams } from "expo-router";

type Props = {
  onSend: (text: string) => void;
};

const SendMessageFooter = ({ onSend }: Props) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    onSend(text);
    setText("");
  };

  return (
    <View className="w-full bg-brand3 px-3 py-2 border-t border-black/10">
      <View className="flex-row items-center bg-brand2 rounded-2xl px-3 py-2">
        <TextInput
          className="flex-1 text-white text-base"
          placeholder="Type a message..."
          placeholderTextColor="#555"
          value={text}
          onChangeText={setText}
        />

        <TouchableOpacity
          className="ml-2 bg-brand1 p-2 rounded-full"
          onPress={handleSend}
        >
          <FontAwesome name="send" size={16} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SendMessageFooter;

import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { apiMiddleware } from "@/utils/middleware";

const CreateChatModal = () => {
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [result, setResult] = useState([]);
  const [err, setErr] = useState();

  const handlePress = async () => {
    if (query === undefined || query.length === 0) {
      setResult([]);
    }
    try {
      const users = await apiMiddleware.get(
        `/conversation/users/search?q=${query}`,
      );

      if (users.data?.users && users.data.ok) {
        setResult(users);
      } else {
        setErr(users.data.message);
      }
    } catch (error) {
      console.log(
        "Something went wrong in getting users in search modal",
        error,
      );
    }
  };
  return (
    <View>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Wpisz imię do dodania do chatu..."
        textContentType="name"
      />
      <TouchableOpacity onPress={handlePress} />
    </View>
  );
};

export default CreateChatModal;

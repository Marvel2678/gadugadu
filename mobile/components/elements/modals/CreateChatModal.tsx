import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { apiMiddleware } from "@/utils/middleware";

const CreateChatModal = ({ onClose }) => {
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [result, setResult] = useState([]);
  const [err, setErr] = useState();

  const handleSearch = async () => {
    if (query === undefined || query.length === 0) {
      setResult([]);
    }
    try {
      const users = await apiMiddleware.get(
        `/conversation/users/search?q=${query}`,
      );
      console.log(users);

      if (users.data?.users && users.data.ok) {
        setResult(users.data?.users);
        console.log(result);
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
    <Pressable className="" onPress={onClose}>
      <Pressable className="" onPress={() => {}}>
        <View className="">
          <Text className="">Nowa rozmowa</Text>
          <TouchableOpacity onPress={onClose}>
            <Text className="">✕</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          placeholder="Wpisz imię użytkownika..."
          className=""
        />

        {result.length !== 0 ? (
          result.map((u) => <Text key={u.id}>{u.name}</Text>)
        ) : (
          <></>
        )}

        {err ? <Text style={{ color: "red" }}>{err}</Text> : null}
      </Pressable>
    </Pressable>
  );
};

export default CreateChatModal;

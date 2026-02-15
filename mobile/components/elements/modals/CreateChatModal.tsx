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
    <Pressable
      className="w-full h-full relative bg-[rgba(5,5,5,30%)] inset-0 z-0"
      onPress={onClose}
    >
      <Pressable
        className="w-[90%] bg-red-500 rounded-lg p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        onPress={() => {}}
      >
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-semibold">Nowa rozmowa</Text>
          <TouchableOpacity onPress={onClose}>
            <Text className="text-xl">✕</Text>
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

import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { apiMiddleware } from "@/utils/middleware";

const CreateChatModal = ({ onClose, visible }) => {
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
    <Modal
      visible={visible}
      animationType="fade"
      // transparent
    >
      <Pressable
        className="flex justify-center items-center bg-[rgba(0,0,0,0.5]"
        onPress={onClose}
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
    </Modal>
  );
};

export default CreateChatModal;

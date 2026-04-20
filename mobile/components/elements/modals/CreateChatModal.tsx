import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  Modal,
  FlatList,
} from "react-native";
import React, { use, useEffect, useState } from "react";
import { apiMiddleware } from "@/utils/middleware";
import { UserType } from "@/types/UserType";
import { router } from "expo-router";

const CreateChatModal = ({ onClose, visible }) => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<UserType[]>([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  let currentQuery = query;
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleClose = () => {
    setQuery("");
    setResult([]);
    setErr("");
    onClose();
  };

  const handleSearch = async () => {
    const localQuery = query;
    if (!localQuery.trim()) {
      setResult([]);
      return;
    }
    try {
      setLoading(true);
      const res = await apiMiddleware.get(
        `/conversation/users/search?q=${query}`,
      );

      if (localQuery !== currentQuery) {
        return;
      }

      if (res.data?.users && res.data.ok) {
        setResult(res.data?.users);
        console.log(result);
      } else {
        setErr(res.data.message);
      }
    } catch (error) {
      console.log(
        "Something went wrong in getting users in search modal",
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSelectUser = async (user) => {
    try {
      const res = await apiMiddleware.post("/conversation/create", {
        users: [user.id],
      });
      if (res.data.ok) {
        const conversation_id = res.data.conversation_id;
        router.push(`/(chats)/${conversation_id}`);
        onClose();
        setQuery("");
        setResult([]);
      } else {
        setErr(res.data.message);
      }
    } catch (error) {
      console.log("Error in creating conversation", error);
    }
  };

  {
    loading && <Text className="text-center text-[#9ca3af]">Szukam...</Text>;
  }
  return (
    <Modal visible={visible} animationType="fade" transparent>
      {/* OVERLAY */}
      <Pressable
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        onPress={handleClose}
      >
        {/* CARD */}
        <Pressable
          className="w-[90%] max-h-[80%] h-full bg-[#1d1d1d] rounded-2xl p-4"
          style={{
            backgroundColor: "#1a1a1a",
            borderWidth: 1,
            borderColor: "#333",
          }}
          onPress={(e) => e.stopPropagation()}
        >
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-lg font-semibold">
              Nowa rozmowa
            </Text>

            <TouchableOpacity onPress={handleClose} className="p-2">
              <Text className="text-[#E8DC2A] text-xl">✕</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            placeholder="Wpisz imię użytkownika..."
            className="mb-4 px-4 py-3 rounded-xl"
            placeholderTextColor={"#a1a1a1"}
            style={{
              backgroundColor: "#262626",
              color: "white",
              borderWidth: 1,
              borderColor: "#333",
            }}
          />

          <View className="flex-1">
            {!loading && result && result.length > 0 ? (
              <FlatList
                data={result}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="py-3 border-b border-[#333]"
                    onPress={() => handleSelectUser(item)}
                  >
                    <Text className="text-white">{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Text className="text-[#9ca3af] text-center mt-4 ">
                Brak wyników
              </Text>
            )}
          </View>

          {err ? (
            <Text className="text-red-400 mt-2 text-center">{err}</Text>
          ) : null}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default CreateChatModal;

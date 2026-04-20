import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import {
  Switch,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Options() {
  const { logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const handleLogout = () => {
    logout();
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Opcje konta */}
      <Text className="text-2xl font-bold text-white mb-6">Konto</Text>
      <View
        className="mb-6 rounded-2xl p-4"
        style={{
          backgroundColor: "#1a1a1a",
          borderWidth: 1,
          borderColor: "#333",
        }}
      >
        {/* <Text className="text-white text-2xl ">Opcje</Text> */}
        <TouchableOpacity
          onPress={() => {}}
          className="flex-row items-center justify-between py-3"
        >
          <Text className="text-white text-xl">Profil</Text>
          <Text className="text-[#9ca3af] text-sm">
            Zarządzaj swoim profilem
          </Text>
        </TouchableOpacity>
      </View>
      <View
        className="mb-6 rounded-2xl p-4"
        style={{
          backgroundColor: "#1a1a1a",
          borderWidth: 1,
          borderColor: "#333",
        }}
      >
        {/* <Text className="text-white text-2xl ">Opcje</Text> */}
        <View className="flex-row items-center justify-between py-3">
          <Text className="text-white text-xl">Dark Mode</Text>
          <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
        </View>
      </View>

      {/* Pozostałe opcje */}

      <Text className="text-2xl text-white font-bold mb-6">Opcje</Text>
      <View
        className="mb-6 rounded-2xl p-4"
        style={{
          backgroundColor: "#1a1a1a",
          borderWidth: 1,
          borderColor: "#333",
        }}
      >
        {/* <Text className="text-white text-2xl ">Opcje</Text> */}
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center justify-between py-3"
        >
          <Text className="text-red-500 text-base">Wyloguj</Text>
          <Text className="text-[#9ca3af] text-sm">
            Wyloguj się ze swojego konta
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

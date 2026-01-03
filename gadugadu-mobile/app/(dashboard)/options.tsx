import { useAuth } from "@/hooks/useAuth";
import {
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";

export default function Options() {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  return (
    <View>
      {/* <TextInput placeholder="Wprowadź tekst" /> */}
      <TouchableOpacity onPress={handleLogout}>
        <Text>Wyloguj</Text>
      </TouchableOpacity>
    </View>
  );
}

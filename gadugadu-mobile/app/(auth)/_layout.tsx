import { useAuth } from "@/hooks/useAuth";
import { Redirect, Tabs } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-brand3 items-center justify-center">
        <Text className="text-white text-xl">Ładowanie...</Text>
      </SafeAreaView>
    );
  }
  if (user !== null) {
    return <Redirect href="/(dashboard)/dashboard" withAnchor={true} />;
  }

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen name="register" options={{ title: "Zarejestruj się" }} />
      <Tabs.Screen name="login" options={{ title: "Zaloguj się" }} />
    </Tabs>
  );
}

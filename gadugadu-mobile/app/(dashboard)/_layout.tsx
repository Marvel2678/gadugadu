import DashboardNavbar from "@/components/elements/navbars/DashboardNavbar";
import { useAuth } from "@/hooks/useAuth";
import { Redirect, Tabs } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-brand3 items-center justify-center">
        <Text className="text-white text-xl">Ładowanie...</Text>
      </SafeAreaView>
    );
  }
  if (user === null) {
    console.log("REDIRECT V222");
    return <Redirect href="/(auth)/login" withAnchor={true} />;
  }

  return (
    <SafeAreaView className="flex-1">
      <DashboardNavbar />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#000000",
          tabBarStyle: { backgroundColor: "#E8DC2A" },
        }}
      >
        <Tabs.Screen name="dashboard" options={{ title: "Home" }} />
        <Tabs.Screen name="options" options={{ title: "Opcje" }} />
      </Tabs>
    </SafeAreaView>
  );
}

import DashboardNavbar from "@/components/elements/DashboardNavbar";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardLayout() {
  return (
    <SafeAreaView className="flex-1">
      <DashboardNavbar />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#F25912",
          tabBarStyle: { backgroundColor: "#211832" },
        }}
      >
        <Tabs.Screen name="dashboard" options={{ title: "Home" }} />
        <Tabs.Screen name="options" options={{ title: "Opcje" }} />
      </Tabs>
    </SafeAreaView>
  );
}

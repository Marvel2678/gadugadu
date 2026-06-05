import { useAuth } from "@/hooks/useAuth";
import { Redirect, Stack, Tabs } from "expo-router";
import { StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
  const { authStatus } = useAuth();
  if (authStatus === "checking") {
    return <Text>Loading...</Text>;
  }
  if (authStatus === "authenticated") {
    return <Redirect href="/(dashboard)/dashboard" withAnchor={true} />;
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack>
    </>
    // <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
    //   <Tabs.Screen name="register" options={{ title: "Zarejestruj się" }} />
    //   <Tabs.Screen name="login" options={{ title: "Zaloguj się" }} />
    // </Tabs>
  );
}

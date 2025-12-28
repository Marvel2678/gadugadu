import { Tabs } from "expo-router";

export default function TestLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen name="register" options={{ title: "Zarejestruj się" }} />
      <Tabs.Screen name="login" options={{ title: "Zaloguj się" }} />
    </Tabs>
  );
}

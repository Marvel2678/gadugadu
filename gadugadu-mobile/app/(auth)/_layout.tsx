import { Tabs } from 'expo-router';

export default function TestLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen name="register" options={{ title: 'Home' }} />
      <Tabs.Screen name="login" options={{ title: 'Settings' }} />
    </Tabs>
  );
}

import { Tabs } from 'expo-router';

export default function DashboardLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#F25912',
        tabBarStyle: { backgroundColor: '#211832' },
      }}>
      <Tabs.Screen name="dashboard" options={{ title: 'Home' }} />
      <Tabs.Screen name="options" options={{ title: 'Opcje' }} />
    </Tabs>
  );
}

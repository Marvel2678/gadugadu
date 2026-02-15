import DashboardNavbar from "@/components/elements/navbars/DashboardNavbar";
import CustomTab from "@/components/ui/customTabBar/CustomTab";
import { useAuth } from "@/hooks/useAuth";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Redirect, Tabs } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Mater from "react-native-vector-icons/MaterialIcons";

export default function DashboardLayout() {
  const { user, loading } = useAuth();

  if (loading) return <Text>Loading</Text>;
  if (!user) return <Redirect href="/(auth)/login" />;

  return (
    <>
      <SafeAreaView edges={["top"]}>
        <DashboardNavbar />
      </SafeAreaView>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#E8DC2A",
            height: 80,
          },
          tabBarItemStyle: {
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            tabBarButton: (props) => (
              <CustomTab
                iconName="home"
                label="Chaty"
                focused={props["aria-selected"]}
                onPress={props.onPress}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="options"
          options={{
            tabBarButton: (props) => (
              <CustomTab
                iconName="settings"
                label="Options"
                focused={props["aria-selected"]}
                onPress={props.onPress}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

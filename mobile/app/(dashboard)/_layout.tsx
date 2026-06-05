import DashboardNavbar from "@/components/elements/navbars/DashboardNavbar";
import CustomTab from "@/components/ui/customTabBar/CustomTab";
import { useAuth } from "@/hooks/useAuth";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Redirect, Tabs } from "expo-router";
import { StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Mater from "react-native-vector-icons/MaterialIcons";

export default function DashboardLayout() {
  const { authStatus } = useAuth();
  if (authStatus === "checking") {
    return <Text>Loading...</Text>;
  }
  if (authStatus === "unauthenticated") {
    return <Redirect href="/login" withAnchor={true} />;
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="light-content" />
      {/* <SafeAreaView edges={["top"]}> */}
      <DashboardNavbar />
      {/* </SafeAreaView> */}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#1a1a1a",
            height: 70,
            borderTopWidth: 1,
            borderTopColor: "#333",
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
    </SafeAreaView>
  );
}

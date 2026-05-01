import { Image, Text, View } from "react-native";
import React from "react";
import { useAuth } from "@/hooks/useAuth";

const DashboardNavbar = () => {
  const { user } = useAuth();
  return (
    <View
      className="w-full flex-row items-center justify-between px-5 py-3"
      style={{
        backgroundColor: "#1a1a1a",
        borderBottomWidth: 1,
        borderBottomColor: "#333",
      }}
    >
      {/* LEFT */}
      <View>
        <Text className="text-2xl font-bold text-[#E8DC2A]">GaduGadu</Text>
        <Text className="text-xs text-[#9ca3af]">
          Witaj, {user?.name || "user"}
        </Text>
      </View>

      {/* RIGHT */}
      <View className="flex-row items-center gap-3">
        {/* Avatar */}
        <View
          style={{
            borderWidth: 2,
            borderColor: "#E8DC2A",
            borderRadius: 999,
            padding: 2,
          }}
        >
          <Image
            source={
              user?.avatar
                ? { uri: user.avatar }
                : require("@assets/images/default_profile_image.jpg")
            }
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default DashboardNavbar;

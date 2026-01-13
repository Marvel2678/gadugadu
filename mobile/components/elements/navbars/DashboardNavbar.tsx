import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import defaultProfileImage from "@/assets/images/default_profile_image.jpg";
const DashboardNavbar = () => {
  return (
    <View className="w-full bg-brand2 py-7 flex items-center justify-between flex-row">
      <Text className="text-2xl font-bold text-brand1 px-5">GaduGadu</Text>
      <View className="px-5">
        <Image
          source={defaultProfileImage}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
      </View>
    </View>
  );
};
export default DashboardNavbar;

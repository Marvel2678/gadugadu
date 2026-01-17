import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Animated } from "react-native";
const CustomTab = ({
  iconName,
  label,
  focused,
  onPress,
}: {
  iconName: string;
  label: string;
  focused: boolean;
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  // let focused = accessibilityState?.focused || false;
  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.15 : 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
    console.log(focused);
  }, [focused]);

  return (
    <View className="flex-1 justify-center items-center">
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
        }}
      >
        <Animated.View
          style={{
            transform: [{ scale }],
            top: focused ? -24 : -16,
            width: 64,
            height: 64,
            borderRadius: 32,
            backgroundColor: "#000",
            alignItems: "center",
            justifyContent: "center",
            elevation: 8,
          }}
        >
          <MaterialIcons
            name={iconName}
            size={22}
            color={focused ? "#E8DC2A" : "#aaa"}
          />
          {focused && (
            <Text style={{ fontSize: 10, color: "#E8DC2A", marginTop: 2 }}>
              {label}
            </Text>
          )}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomTab;

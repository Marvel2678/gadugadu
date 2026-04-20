import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
} from "react-native-reanimated";
import { View } from "react-native";
import { useEffect } from "react";

export default function TypingBox() {
  const dots = [useSharedValue(0), useSharedValue(0), useSharedValue(0)];

  useEffect(() => {
    dots.forEach((dot, index) => {
      dot.value = withDelay(
        index * 150, // 👈 klucz!
        withRepeat(withTiming(1, { duration: 400 }), -1, true),
      );
    });
  }, []);

  return (
    <View
      className="self-start px-4 py-3 rounded-2xl mb-2"
      style={{
        backgroundColor: "#262626",
      }}
    >
      <View className="flex-row items-center">
        {dots.map((dot, index) => {
          const style = useAnimatedStyle(() => ({
            opacity: 0.3 + dot.value * 0.7,
            transform: [
              {
                translateY: -4 * dot.value, // 👈 bounce zamiast scale
              },
            ],
          }));

          return (
            <Animated.View
              key={index}
              style={style}
              className="w-2 h-2 mx-1 rounded-full bg-white"
            />
          );
        })}
      </View>
    </View>
  );
}

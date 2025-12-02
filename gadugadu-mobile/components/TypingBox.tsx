import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';
import { View } from 'react-native';
import { useEffect } from 'react';

export default function TypingBox() {
  const scales = [useSharedValue(1), useSharedValue(1), useSharedValue(1)];

  useEffect(() => {
    scales.forEach((dot, index) => {
      dot.value = withRepeat(withTiming(1.6, { duration: 300 }), -1, true);
    });
  }, []);

  return (
    <View className="my-4 flex h-[10%] w-[30%] items-center justify-center rounded-2xl bg-slate-800 p-5">
      <View className="flex flex-row items-center justify-between">
        {scales.map((dot, index) => {
          const style = useAnimatedStyle(() => ({
            transform: [{ scale: dot.value }],
            opacity: dot.value,
          }));

          return (
            <Animated.View
              key={index}
              style={style}
              className="mx-2 h-2 w-2 rounded-full bg-white"
            />
          );
        })}
      </View>
    </View>
  );
}

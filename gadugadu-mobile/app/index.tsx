import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import TypingBox from "../components/TypingBox";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function Root() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0 intro, 1 typing, 2 question

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 3000);
    const t2 = setTimeout(() => setStep(2), 6500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-brand3 px-6">
      <View className="w-full max-w-md rounded-xl bg-brand4 p-6">
        <Text className="mb-4 text-center text-2xl font-bold text-white">
          GaduGadu
        </Text>
        <View className="mb-4 rounded-lg bg-slate-800 p-4">
          <Text className="text-lg text-white">
            Młodzieżowy komunikator wraca do gry!
          </Text>
        </View>

        {step === 1 && <TypingBox />}

        {step === 2 && (
          <View className="mb-4 rounded-lg bg-slate-800 p-4">
            <Text className="text-lg text-white">
              Chcesz utworzyć konto albo zalogować się by dołączyć do nas?
            </Text>
          </View>
        )}

        {step === 2 && (
          <View className="mt-2">
            <Button
              title="Dołączam"
              color="#F25912"
              onPress={() => router.push("/(auth)/login")}
            />
          </View>
        )}
      </View>
      <View className="mt-6">
        <Button
          title="Go to Dashboard (dev)"
          onPress={() => router.push("/(dashboard)/dashboard")}
        />
      </View>
    </SafeAreaView>
  );
}

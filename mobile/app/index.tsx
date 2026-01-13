import { View, Text, Button, TouchableOpacity } from "react-native";
import { Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import TypingBox from "@/components/TypingBox";
import { SafeAreaView } from "react-native-safe-area-context";
import "@/global.css";
import { useAuth } from "@/hooks/useAuth";

export default function Root() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0 intro, 1 typing, 2 question
  const { user, loading } = useAuth();

  useEffect(() => {
    // if (!user || loading) return;
    const t1 = setTimeout(() => setStep(1), 3000);
    const t2 = setTimeout(() => setStep(2), 6500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  if (loading) {
    return null;
  }

  if (user) {
    return <Redirect href="/(dashboard)/dashboard" withAnchor={true} />;
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-brand3 px-6">
      <View className="w-full max-w-md rounded-xl bg-brand2 p-6">
        <Text className="mb-4 text-center text-2xl font-bold text-brand1">
          GaduGadu
        </Text>
        <View className="mb-4 rounded-lg bg-brand3 p-4">
          <Text className="text-lg text-brand2">
            Młodzieżowy komunikator wraca do gry!
          </Text>
        </View>

        {step === 1 && <TypingBox />}

        {step === 2 && (
          <View className="mb-4 rounded-lg bg-brand3 p-4">
            <Text className="text-lg text-brand2">
              Chcesz utworzyć konto albo zalogować się by dołączyć do nas?
            </Text>
          </View>
        )}

        {step === 2 && (
          <TouchableOpacity
            className="mt-4 bg-[#E8DC2A] rounded-xl py-3"
            onPress={() => router.push("/(auth)/login")}
          >
            <Text className="text-center font-semibold text-black text-lg">
              Dołączam
            </Text>
          </TouchableOpacity>
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

import { View, Text, Button, TouchableOpacity } from "react-native";
import { Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import TypingBox from "@/components/TypingBox";
import { SafeAreaView } from "react-native-safe-area-context";
import "@/global.css";
import { useAuth } from "@/hooks/useAuth";
import ActionBubble from "@/components/ActionBubble";
import MessageBubble from "@/components/MessageBubble";

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
    <SafeAreaView className="flex-1 px-4 bg-background">
      {/* HEADER */}
      <View className="pt-6 pb-4">
        <Text className="text-3xl font-bold text-accent">GaduGadu</Text>
        <Text className="text-lg text-textSecondary">
          Młodzieżowy komunikator wraca do gry!
        </Text>
      </View>

      {/* CHAT */}
      <View className="flex-1 justify-end pb-6">
        <View className="flex flex-col">
          {/* Message 1 */}
          <MessageBubble text="Hej 👋" isUser={false} />

          {/* Typing */}
          {step === 1 && <TypingBox />}

          {/* Message 2 */}
          {step === 2 && (
            <>
              <MessageBubble
                text="Chcesz dołączyć do naszej aplikacji?"
                isUser={false}
              />
              <ActionBubble onPress={() => router.push("/(auth)/login")} />
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

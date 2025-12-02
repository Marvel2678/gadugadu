import { View, Text, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState('');

  return (
    <View className="flex-1 items-center justify-center bg-brand2 p-6">
      <View className="w-full max-w-md rounded-lg bg-brand4 p-6">
        <Text className="mb-4 text-2xl text-white">Register</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          className="mb-3 rounded bg-white p-2"
        />
        <Button
          title="Zarejestruj"
          onPress={() => router.push('/(dash)/dashboard')}
          color="#F25912"
        />
      </View>
    </View>
  );
}

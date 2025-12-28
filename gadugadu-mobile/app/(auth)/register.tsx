import { View, Text, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { EmailValidator, PasswordValidator } from "@/utils/validators";
import { AppConfig } from "@/utils/appConfig";
import { AuthContext } from "@/context/userContext";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const register = async () => {
    try {
      setErr("");
      if (!name || !username || !email || !password) {
        return setErr("Nie wszystko jest wypełnione");
      }
      const EmailValidation = EmailValidator(email);

      if (EmailValidation !== null) {
        return setErr(EmailValidation);
      }

      const PasswordValidation = PasswordValidator(password);

      if (PasswordValidation !== null) {
        return setErr(PasswordValidation);
      }

      const res = await fetch(AppConfig.SERVER_URL + "/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return setErr(data.message || "Błąd rejestracji");
      }

      router.replace("/(auth)/login");
    } catch (err) {
      setErr("Brak połączenia z serwerem");
      console.log(err);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-brand3 p-6">
      <View className="w-full max-w-md rounded-lg bg-brand4 p-6">
        <Text className="mb-4 text-2xl text-white">Register</Text>
        <Text>{err}</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Imię"
          className="mb-3 rounded bg-white p-2"
        />
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Nazwa Użytkownika"
          className="mb-3 rounded bg-white p-2"
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          className="mb-3 rounded bg-white p-2"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Hasło"
          className="mb-3 rounded bg-white p-2"
        />
        <Button title="Zarejestruj" onPress={register} color="#F25912" />
      </View>
    </View>
  );
}

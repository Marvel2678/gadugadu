import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export async function save(key: string, value: string) {
  try {
    if (Platform.OS === "web") {
      await AsyncStorage.setItem(key, value);
    } else {
      // mobile
      await SecureStore.setItemAsync(key, value.toString());
    }
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

export async function getValueFor(key: string) {
  let result: string | null = null;
  try {
    if (Platform.OS === "web") {
      result = await AsyncStorage.getItem(key);
      //   if (result) {
      //     alert("🔐 Here's your value 🔐 \n" + result);
      //   } else {
      //     alert("No values stored under that key.");
      //   }
    } else {
      result = await SecureStore.getItemAsync(key);
      //   if (result) {
      //     alert("🔐 Here's your value 🔐 \n" + result);
      //   } else {
      //     alert("No values stored under that key.");
      //   }
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
  return result;
}

export async function deleteValueFor(key: string) {
  try {
    if (Platform.OS === "web") {
      await AsyncStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}

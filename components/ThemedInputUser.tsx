import {
  View,
  Text,
  TextInput,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { ThemedView } from "./ThemedView";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export type ThemedInputUser = {
  name: string;
  icon_name: any;
};

const ThemedInputUser = ({ name, icon_name }: ThemedInputUser) => {
  const colorScheme = useColorScheme();
  const [isFocused, setIsFocused] = useState(false);
  return (
    <ThemedView className="w-10/12 flex-row gap-4 cursor-text items-center m-0 border-white border-b-2 focus:border-green-500 transition-all duration-600 ease-in-out">
      <FontAwesome
        name={icon_name}
        size={24}
        color={
          isFocused
            ? Colors[colorScheme ?? "light"].iconBright
            : Colors[colorScheme ?? "light"].icon
        }
        className="border-solid border border-white"
      />
      <TextInput
        placeholder={name}
        className="p-5 text-3xl w-10/12 pl-2 text-white"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </ThemedView>
  );
};

export default ThemedInputUser;

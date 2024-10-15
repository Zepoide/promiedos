import { TextInput, useColorScheme, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "./ThemedView";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export type ThemedInputUser = {
  name: string;
  icon_name: any;
  type?: string;
};

const ThemedInputUser = ({ name, icon_name, type }: ThemedInputUser) => {
  const colorScheme = useColorScheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
        secureTextEntry={type === "password" && !showPassword}
        autoComplete="off"
        textContentType="oneTimeCode"
        importantForAutofill="no"
        autoCapitalize="none"
        autoCorrect={false}
        className="p-5 text-3xl w-10/12 pl-2 text-white"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {type === "password" && (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <FontAwesome
            name={showPassword ? "eye-slash" : "eye"}
            size={24}
            color={Colors[colorScheme ?? "light"].icon}
          />
        </TouchableOpacity>
      )}
    </ThemedView>
  );
};

export default ThemedInputUser;

import { TextInput, TouchableOpacity, TextInputProps } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "./ThemedView";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";

export type ThemedInputUser = TextInputProps & {
  name: string;
  icon_name: any;
  type?: string;
  error?: any;
};

const ThemedInputUser = ({
  name,
  icon_name,
  type,
  error,
  ...props
}: ThemedInputUser) => {
  const { colorScheme } = useColorScheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemedView
      className={`w-10/12 m-0 flex-row items-center cursor-text border-white border-b-2 ${error ? "border-red-500" : "border-white focus:border-green-500"} transition-all duration-600 ease-in-out`}
    >
      <FontAwesome
        name={icon_name}
        size={20}
        color={
          isFocused
            ? Colors[colorScheme ?? "light"].iconBright
            : Colors[colorScheme ?? "light"].icon
        }
        style={{ width: "10%", textAlign: "center" }}
      />
      <TextInput
        placeholder={name}
        secureTextEntry={type === "password" && !showPassword}
        autoComplete="off"
        textContentType="oneTimeCode"
        importantForAutofill="no"
        autoCapitalize="none"
        autoCorrect={false}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="flex-1 h-20 px-4 align-middle text-xl text-black dark:text-white"
        {...props}
      />
      {type === "password" && (
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={{ paddingLeft: 16 }}
        >
          <FontAwesome
            name={showPassword ? "eye-slash" : "eye"}
            size={20}
            color={Colors[colorScheme ?? "light"].icon}
          />
        </TouchableOpacity>
      )}
    </ThemedView>
  );
};

export default ThemedInputUser;

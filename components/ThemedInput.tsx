import React, { useEffect, useState, useRef } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  Animated,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FieldError } from "react-hook-form";

interface ThemedInputProps extends TextInputProps {
  label?: string;
  error?: FieldError | string;
  value: string;
  icon: any;
  icon_right?: React.ReactNode;
}

const ThemedInput = ({
  label,
  error,
  icon,
  style,
  icon_right,
  ...rest
}: ThemedInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (error) {
      shake();
    }
  }, [error]);

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <ThemedView className="my-2">
      <ThemedView className="space-y-2">
        {label && (
          <ThemedText className="text-lg font-semibold">{label}</ThemedText>
        )}
        <Animated.View
          style={{
            transform: [{ translateX: shakeAnimation }],
          }}
          className={`flex-row items-center border ${error ? "border-red-700" : "border-gray-700"} rounded-lg p-3`}
        >
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color={`${error ? "#ef4444" : "#666"}`}
            style={{ marginRight: 10 }}
          />
          <TextInput
            placeholderTextColor="#666"
            className="flex-1 text-black dark:text-white"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...rest}
          />
          {icon_right}
        </Animated.View>
      </ThemedView>
      {error && (
        <ThemedText className="text-sm text-red-500 ml-2">
          {typeof error === "string" ? error : error.message}
        </ThemedText>
      )}
    </ThemedView>
  );
};

export default ThemedInput;

import { View, Text, Pressable } from "react-native";
import { useColorScheme } from "nativewind";
import React from "react";
import { ThemedView } from "@/components/ThemedView";

const Register = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <ThemedView
      type="primary"
      className="flex-1 items-center justify-center bg-dark"
    >
      <Text>Register</Text>
      <Pressable onPress={toggleColorScheme}>
        <Text>Toggle Color Scheme {colorScheme}</Text>
      </Pressable>
    </ThemedView>
  );
};

export default Register;

import { View, Text, Pressable } from "react-native";
import { useColorScheme } from "nativewind";
import React from "react";

const Register = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <View className="flex-1 items-center justify-center bg-green-500 dark:bg-red-500">
      <Text>Register</Text>
      <Pressable onPress={() => toggleColorScheme()}>
        <Text>Toggle Color Scheme {colorScheme}</Text>
      </Pressable>
    </View>
  );
};

export default Register;

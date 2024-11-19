import React from "react";
import { View, Switch, Text, Pressable } from "react-native";
import { useColorScheme } from "nativewind";
import Svg, { Path } from "react-native-svg";

const SunIcon = () => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 17a5 5 0 100-10 5 5 0 000 10z" />
  </Svg>
);

const MoonIcon = () => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </Svg>
);

export default function ThemeSwitcher() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="flex-row items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-full shadow-md">
      <Pressable onPress={toggleColorScheme} className="flex-row items-center">
        <View
          className={`p-2 rounded-full ${colorScheme === "light" ? "bg-yellow-100" : "bg-transparent"}`}
        >
          <SunIcon />
        </View>
        <View
          className={`p-2 rounded-full ${colorScheme === "dark" ? "bg-blue-100" : "bg-transparent"}`}
        >
          <MoonIcon />
        </View>
      </Pressable>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={colorScheme === "dark" ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleColorScheme}
        value={colorScheme === "dark"}
      />
    </View>
  );
}

import React from "react";
import { Stack, Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function TabLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme].tint,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors[colorScheme].primary,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Matches",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="soccer-field"
                color={color}
                size={24}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

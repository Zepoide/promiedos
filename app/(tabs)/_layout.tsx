import React from "react";
import { Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function TabLayout() {
  const colorScheme = useColorScheme() || "light";
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Partidos",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "football" : "football-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "User",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="register"
        options={{
          tabBarButton: () => null,
        }}
      /> */}
    </Tabs>
  );
}

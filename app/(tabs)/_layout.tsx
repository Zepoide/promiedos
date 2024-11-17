import React from "react";
import { Tabs, Stack } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function TabLayout() {
    const { colorScheme, toggleColorScheme } = useColorScheme();

    return (
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
            <Tabs.Screen
                name="standings"
                options={{
                    title: "Standings",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "trophy" : "trophy-outline"}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="register"
                options={{
                    tabBarButton: () => null,
                }}
            />
            <Tabs.Screen
                name="(details)"
                options={{
                    tabBarButton: () => null,
                }}
            />
        </Tabs>
    );
}

{
    /* <Stack screenOptions={{ gestureEnabled: true }}>
  <Stack.Screen name="index" options={{ headerShown: false }} />
  <Stack.Screen name="competition/[id]" />
  <Stack.Screen name="profile" />
  <Stack.Screen name="register" />
  <Stack.Screen name="standings" options={{ headerShown: false }} />
</Stack>; */
}

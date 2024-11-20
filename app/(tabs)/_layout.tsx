import React from "react";
import { Stack, Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function TabLayout() {
    const { colorScheme } = useColorScheme();

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
                name="home"
                options={{
                    title: "Matches",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "football" : "football-outline"}
                            color={color}
                        />
                        // <MaterialCommunityIcons
                        //   name="soccer-field"
                        //   color={color}
                        //   size={24}
                        // />
                    ),
                }}
            />
            <Tabs.Screen
                name="following"
                options={{
                    title: "Following",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "star" : "star-outline"}
                            color={color}
                        />
                    ),
                }}
            />
            <Stack.Screen name="(details)" />
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

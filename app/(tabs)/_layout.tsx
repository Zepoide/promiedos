import React, { useEffect } from "react";
import { Stack, Tabs, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useAuthorizedUser } from "@/hooks/useUser";
import { userStore } from "@/store/userStore";

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const { user } = userStore();
  const router = useRouter();

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
            <MaterialCommunityIcons
              name="soccer-field"
              color={color}
              size={24}
            />
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
      <Tabs.Screen
        name="account"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
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

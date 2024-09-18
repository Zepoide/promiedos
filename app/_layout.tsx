import { Tabs } from "expo-router"

import { Colors } from "@/constants/Colors"
import { useColorScheme } from "@/hooks/useColorScheme"
import { TabBarIcon } from "@/components/navigation/TabBarIcon"

export default function TabLayout() {
  const colorScheme = useColorScheme()
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "dark"].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "dark"].background,
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
    </Tabs>
  )
}

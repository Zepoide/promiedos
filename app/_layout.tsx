import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useColorScheme } from "nativewind";
import { AuthProvider } from "@/context/AuthContext";
import { Appearance } from "react-native";
import { useState, useEffect } from "react";
import { Colors } from "@/constants/Colors";
import { NativeWindStyleSheet } from "nativewind";
import { set } from "react-hook-form";

NativeWindStyleSheet.setOutput({
  default: "native",
});
const queryClient = new QueryClient({});

export default function RootLayout() {
  const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme();
  const [statusBarStyle, setStatusBarStyle] = useState<"light" | "dark">(
    "light"
  );
  useEffect(() => {
    setColorScheme("dark");
  }, []);

  useEffect(() => {
    setStatusBarStyle(colorScheme === "light" ? "dark" : "light");
  }, [colorScheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StatusBar style={statusBarStyle} />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(details)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </QueryClientProvider>
  );
}

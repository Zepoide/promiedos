import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useColorScheme } from "nativewind";

const queryClient = new QueryClient({});

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  console.log(colorScheme);
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}

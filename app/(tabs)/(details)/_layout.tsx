import { Stack } from "expo-router";
import { SafeAreaView, Button, Text } from "react-native";
import { useRouter } from "expo-router";

export default function DetailsLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="competition/[id]"
        options={{
          headerTitle: "Competition Details",
          headerLeft: () => (
            <Button title="Back" onPress={() => router.back()} />
          ),
          headerShown: false,
        }}
      />
    </Stack>
  );
}

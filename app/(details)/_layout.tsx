import { Stack } from "expo-router";

export default function DetailsLayout() {
  return (
    <Stack
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="competition/[id]"
        options={{
          title: "Competition Details",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="match/[id]"
        options={{
          title: "Match Details",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="team/[id]"
        options={{
          title: "Match Details",
          headerShown: false,
        }}
      />
    </Stack>
  );
}

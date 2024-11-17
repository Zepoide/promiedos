import React, { useState } from "react";
import { Pressable } from "react-native";
import { useColorScheme } from "nativewind";
import { formatDate, generateDates } from "@/lib/utils";
import Container from "@/components/Container";
import CustomTabView from "@/components/CustomTabView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import MatchesPerDay from "@/components/MatchesPerDay";

const HomeScreen = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const today = new Date();
  const [dates, setDates] = useState(generateDates(today));

  return (
    <Container>
      <ThemedView className="flex-row justify-between items-center bg-white dark:bg-dark-primary">
        <ThemedText className="text-2xl font-extrabold p-3">
          PROMIEDOS
        </ThemedText>
        <Pressable
          onPress={() => toggleColorScheme()}
          className="border-solid border-2 border-gray-500 p-3 rounded-md"
        >
          <ThemedText>Change Theme</ThemedText>
        </Pressable>
      </ThemedView>
      <CustomTabView
        tabs={dates.map((date) => formatDate(date))}
        initialPage={6}
        pages={dates.map((date) => () => <MatchesPerDay date={date} />)}
      />
    </Container>
  );
};

export default HomeScreen;

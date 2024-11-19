import React, { useState } from "react";
import { Pressable, Switch, TouchableOpacity } from "react-native";
import { useColorScheme } from "nativewind";
import { formatDate, generateDates } from "@/lib/utils";
import Container from "@/components/Container";
import CustomTabView from "@/components/CustomTabView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import MatchesPerDay from "@/components/MatchesPerDay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "@/components/Icon";
import { useAuthorizedUser } from "@/hooks/useUser";

const HomeScreen = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const today = new Date();
  const [dates, setDates] = useState(generateDates(today));

  return (
    <Container>
      <ThemedView
        type="primary"
        className="flex-row justify-between items-center "
      >
        <ThemedText className="text-2xl font-extrabold p-3">
          PROMIEDOS
        </ThemedText>
        <ThemedView className="flex flex-row items-center">
          <TouchableOpacity
            onPress={() => toggleColorScheme()}
            activeOpacity={0.8}
            className="p-3"
          >
            <Icon
              name={`${colorScheme === "light" ? "sunny-outline" : "moon-outline"}`}
              size={24}
            />
          </TouchableOpacity>
        </ThemedView>
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

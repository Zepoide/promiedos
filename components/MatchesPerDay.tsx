import React from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import useMatches from "@/hooks/useMatches";
import CompetitionMatches from "./CompetitionMatches";
import { Collapsible } from "./Collapsible";
import MatchInfo from "./MatchInfo";

interface MatchesPerDayProps {
  date: Date;
}

const MatchesPerDay = ({ date }: MatchesPerDayProps) => {
  const { data, isLoading } = useMatches(date);

  if (isLoading) {
    return (
      <ThemedView className="flex-1 flex justify-center items-center bg-white dark:bg-black">
        <ActivityIndicator size="large" color="red" />
      </ThemedView>
    );
  }

  if (data?.length === 0) {
    return (
      <ThemedView className="flex-1 flex items-center p-4 bg-white dark:bg-black">
        <ThemedText className="font-extrabold">No matches today</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView
      type="background"
      className="flex-1 flex justify-center w-full "
    >
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <CompetitionMatches {...item}></CompetitionMatches>
        )}
      ></FlatList>
    </ThemedView>
  );
};

export default MatchesPerDay;

{
  /* <Collapsible title={item.competition.name}>
              {item.matches.map((match) => (
                <MatchInfo key={match.id} match={match} />
              ))}
            </Collapsible> */
}

import React from "react";
import Container from "@/components/Container";
import { ThemedText } from "@/components/ThemedText";
import { H2HData, IMatchPreview, MatchH2H } from "@/types/types";
import apiService from "@/services/api.service";
import { useQuery } from "@tanstack/react-query";
import { ThemedView } from "@/components/ThemedView";
import { View, Text, FlatList } from "react-native";
import MatchPreview from "@/components/MatchPreview";
import { formatDate } from "@/lib/utils";
import { ActivityIndicator } from "react-native";

const Head2Head = ({ matchId }: { matchId: string }) => {
  const { data, isLoading, error } = useQuery<H2HData>({
    queryKey: [`matches-H2H-${matchId}`],
    queryFn: () => apiService.get(`/matches/${matchId}/H2H`),
  });

  if (isLoading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="green" />
      </Container>
    );
  }

  if (!data) {
    return (
      <Container>
        <ThemedText>No H2H data found</ThemedText>
      </Container>
    );
  }

  function countResults(lastMatches: IMatchPreview[]) {
    const results: { [key: string]: { wins: number; draws: number } } = {};

    lastMatches?.forEach((match: IMatchPreview) => {
      const { homeTeam, awayTeam, scoreHome, scoreAway } = match;

      // Initialize teams in the results object if they don't exist
      if (!results[homeTeam.id]) {
        results[homeTeam.id] = { wins: 0, draws: 0 };
      }
      if (!results[awayTeam.id]) {
        results[awayTeam.id] = { wins: 0, draws: 0 };
      }

      // Determine the result for the home team
      if ((scoreHome ?? 0) > (scoreAway ?? 0)) {
        results[homeTeam.id].wins += 1;
      } else if ((scoreHome ?? 0) < (scoreAway ?? 0)) {
        results[awayTeam.id].wins += 1;
      } else {
        results[homeTeam.id].draws += 1;
        results[awayTeam.id].draws += 1;
      }
    });

    return results;
  }

  if (data.lastMatches.length === 0) {
    return (
      <ThemedView
        type="background"
        className="flex flex-1 justify-start items-center p-2"
      >
        <ThemedText className="text-2xl font-semibold">
          No H2H data found
        </ThemedText>
      </ThemedView>
    );
  }
  const stats = countResults(data.lastMatches);

  return (
    <ThemedView type="background" className="flex p-2">
      <ThemedView type="primary" className="p-4 space-y-4 rounded-lg">
        <ThemedView className="flex-row justify-around">
          <ThemedView className="items-center">
            <ThemedView
              style={{ backgroundColor: `#${data.homeTeam.primary_color}` }}
              className=" rounded-3xl px-4 py-1"
            >
              <Text
                style={{ color: `#${data.homeTeam.number_color}` }}
                className=" text-2xl font-bold"
              >
                {stats[data.homeTeam.id].wins}
              </Text>
            </ThemedView>
            <Text className="text-white mt-1">Won</Text>
          </ThemedView>
          <ThemedView className="items-center">
            <ThemedView className="bg-gray-500 rounded-3xl px-4 py-1">
              <Text className="text-white text-2xl font-bold">
                {stats[data.homeTeam.id].draws}
              </Text>
            </ThemedView>
            <Text className="text-white mt-1">Drawn</Text>
          </ThemedView>
          <ThemedView className="items-center">
            <ThemedView
              style={{ backgroundColor: `#${data.awayTeam.primary_color}` }}
              className="rounded-3xl px-4 py-1"
            >
              <Text
                style={{ color: `#${data.awayTeam.number_color}` }}
                className=" text-2xl font-bold"
              >
                {stats[data.awayTeam.id].wins}
              </Text>
            </ThemedView>
            <Text className="text-white mt-1">Won</Text>
          </ThemedView>
        </ThemedView>
        {/* Progress Bar */}
        <View className="flex-row h-1">
          <View
            style={{
              backgroundColor: `#${data.homeTeam.primary_color}`,
              flex: stats[data.homeTeam.id].wins,
            }}
          />
          <View
            style={{
              backgroundColor: "gray",
              flex: stats[data.homeTeam.id].draws,
            }}
          />
          <View
            style={{
              backgroundColor: `#${data.awayTeam.primary_color}`,
              flex: stats[data.awayTeam.id].wins,
            }}
          />
        </View>

        <FlatList
          data={data.lastMatches}
          renderItem={({ item: match }) => (
            <ThemedView className="flex flex-col">
              <ThemedView className="flex flex-row justify-between">
                <ThemedText>
                  {formatDate(new Date(match.start_time))}
                </ThemedText>
                <ThemedText>{match.competition.name}</ThemedText>
              </ThemedView>
              <MatchPreview key={match.id} match={{ ...match }} />
            </ThemedView>
          )}
          bounces={false}
        ></FlatList>
      </ThemedView>
    </ThemedView>
  );
};

export default Head2Head;

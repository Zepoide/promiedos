import React from "react";
import Container from "./Container";
import { ThemedText } from "./ThemedText";
import { H2HData, MatchH2H } from "@/types/types";
import apiService from "@/services/api.service";
import { useQuery } from "@tanstack/react-query";
import { ThemedView } from "./ThemedView";
import { View, Text, FlatList } from "react-native";
import MatchPreview from "./MatchPreview";
import { formatDate } from "../lib/utils";

const Head2Head = ({ matchId }: { matchId: string }) => {
  const { data, isLoading, error } = useQuery<H2HData>({
    queryKey: [`matches-H2H-${matchId}`],
    queryFn: () => apiService.get(`/matches/${matchId}/H2H`),
  });

  if (isLoading) {
    return (
      <Container>
        <ThemedText>Loading...</ThemedText>
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

  function countResults(lastMatches: MatchH2H[]) {
    const results: { [key: string]: { wins: number; draws: number } } = {};

    lastMatches.forEach((match: MatchH2H) => {
      const { home_team, away_team, scoreHome, scoreAway } = match;

      // Initialize teams in the results object if they don't exist
      if (!results[home_team.id]) {
        results[home_team.id] = { wins: 0, draws: 0 };
      }
      if (!results[away_team.id]) {
        results[away_team.id] = { wins: 0, draws: 0 };
      }

      // Determine the result for the home team
      if (scoreHome > scoreAway) {
        results[home_team.id].wins += 1;
      } else if (scoreHome < scoreAway) {
        results[away_team.id].wins += 1;
      } else {
        results[home_team.id].draws += 1;
        results[away_team.id].draws += 1;
      }
    });

    return results;
  }
  const teams = {
    [data.homeTeam.id]: data.homeTeam,
    [data.awayTeam.id]: data.awayTeam,
  };
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
                <ThemedText>{match.competition}</ThemedText>
              </ThemedView>
              <MatchPreview
                key={match.id}
                match={{
                  id: match.id,
                  start_time: match.start_time,
                  homeTeamId: match.home_team.id,
                  awayTeamId: match.away_team.id,
                  scoreHome: match.scoreHome,
                  scoreAway: match.scoreAway,
                  homeTeam: {
                    name: teams[match.home_team.id].name,
                    logo: teams[match.home_team.id].logo,
                  },
                  awayTeam: {
                    name: teams[match.away_team.id].name,
                    logo: teams[match.away_team.id].logo,
                  },
                }}
              />
            </ThemedView>
          )}
        ></FlatList>
      </ThemedView>
    </ThemedView>
  );
};

export default Head2Head;

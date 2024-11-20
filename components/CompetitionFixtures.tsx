import { FlatList } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import apiService from "@/services/api.service";
import { useQuery } from "@tanstack/react-query";
import { IMatchInfo } from "@/types/types";
import { formatDate } from "@/lib/utils";
import MatchPreview from "@/components/MatchPreview";
import { ActivityIndicator } from "react-native";
import Container from "./Container";

interface Props {
  competitionId: string;
}

const CompetitionFixtures = ({ competitionId }: Props) => {
  const {
    data: fixtures,
    isLoading,
    error,
  } = useQuery<IMatchInfo[]>({
    queryKey: [`competition-${competitionId}-fixture`],
    queryFn: () => apiService.get(`/competition/${competitionId}/fixture`),
  });

  if (isLoading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="green" />
      </Container>
    );
  }

  if (!fixtures) {
    return (
      <ThemedView>
        <ThemedText>Error loading fixtures</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView className="m-2">
      <ThemedView className="flex flex-row justify-between items-center ">
        <FlatList
          showsVerticalScrollIndicator={false}
          data={fixtures}
          renderItem={({ item: match }: { item: any }) => (
            <ThemedView className="mt-2">
              <ThemedView
                type="primary"
                className="flex flex-row justify-between items-center px-2 py-1 rounded-t-lg "
              >
                <ThemedText>
                  {formatDate(new Date(match.start_time))}
                </ThemedText>
                <ThemedText>{match.competition.name}</ThemedText>
              </ThemedView>
              <MatchPreview
                key={match.id}
                match={{
                  id: match.id,
                  start_time: match.start_time,
                  homeTeamId: match.homeTeam.id,
                  awayTeamId: match.awayTeam.id,
                  scoreHome: match.scoreHome,
                  scoreAway: match.scoreAway,
                  homeTeam: {
                    name: match.homeTeam.name,
                    logo: match.homeTeam.logo,
                  },
                  awayTeam: {
                    name: match.awayTeam.name,
                    logo: match.awayTeam.logo,
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

export default CompetitionFixtures;

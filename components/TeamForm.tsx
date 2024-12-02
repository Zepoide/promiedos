import React from "react";
import Container from "./Container";
import { ThemedText } from "./ThemedText";
import { IMatchInfo, Match } from "@/types/types";
import apiService from "@/services/api.service";
import { useQuery } from "@tanstack/react-query";
import { ThemedView } from "./ThemedView";
import { Image } from "react-native";
import { ActivityIndicator } from "react-native";

interface TeamFormsProps {
  teamId: string;
  skip?: number;
}

const TeamForm = ({ teamId, skip }: TeamFormsProps) => {
  const {
    data: teamForm,
    isLoading,
    error,
  } = useQuery<Match[]>({
    queryKey: [`team-form-${teamId}-${skip ?? 0}`],
    queryFn: () => apiService.get(`/team/${teamId}/form?skip=${skip ?? 0}`),
  });

  if (isLoading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="green" />
      </Container>
    );
  }

  function getMatchResult(
    teamId: string,
    match: Match
  ): "won" | "draw" | "lost" | "not_played" {
    const { homeTeamId, awayTeamId, scoreHome, scoreAway } = match;

    if (teamId !== homeTeamId && teamId !== awayTeamId) {
      return "not_played"; // The team didn't play in this match
    }

    if (scoreHome === scoreAway) {
      return "draw"; // It's a draw
    }

    if (
      (teamId === homeTeamId && scoreHome > scoreAway) || // Home team wins
      (teamId === awayTeamId && scoreAway > scoreHome) // Away team wins
    ) {
      return "won";
    }

    return "lost"; // If none of the above, the team lost
  }

  return (
    <ThemedView>
      {teamForm?.map((match, index) => (
        <ThemedView
          key={index}
          className="flex-row items-center justify-between gap-2 py-2"
        >
          <Image
            source={{ uri: match.homeTeam?.logo || "" }}
            defaultSource={require("@/assets/images/logo-placeholder.png")}
            resizeMode="contain"
            className="w-6 h-6"
          />
          <ThemedView
            className={`px-2 py-1 rounded-md ${
              getMatchResult(teamId, match) === "won"
                ? "bg-green-500"
                : getMatchResult(teamId, match) === "lost"
                  ? "bg-red-500"
                  : "bg-gray-400"
            }`}
          >
            <ThemedText className="font-bold">
              {match.scoreHome} - {match.scoreAway}
            </ThemedText>
          </ThemedView>
          <Image
            source={{ uri: match.awayTeam?.logo || "" }}
            resizeMode="contain"
            defaultSource={require("@/assets/images/logo-placeholder.png")}
            className="w-6 h-6"
          />
        </ThemedView>
      ))}
    </ThemedView>
  );
};

export default TeamForm;

import React from "react";
import Container from "@/components/Container";
import { ThemedText } from "@/components/ThemedText";
import { IMatchInfo } from "@/types/types";
import apiService from "@/services/api.service";
import { useQuery } from "@tanstack/react-query";
import { ThemedView } from "@/components/ThemedView";
import { Text } from "react-native";
import { Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { formatDate } from "@/lib/utils";
import { useColorScheme } from "nativewind";
import TeamForm from "@/components/TeamForm";
import { ActivityIndicator } from "react-native";

const MatchInfo = ({ matchId }: { matchId: string }) => {
  const { colorScheme } = useColorScheme();
  const {
    data: matchInfo,
    isLoading,
    error,
  } = useQuery<IMatchInfo>({
    queryKey: [`match-info-${matchId}`],
    queryFn: () => apiService.get(`/matches/${matchId}/info`),
  });

  if (isLoading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="green" />
      </Container>
    );
  }

  if (!matchInfo) {
    return (
      <Container>
        <ThemedText>Match not found</ThemedText>
      </Container>
    );
  }

  const matchResults: any = [
    {
      homeTeam: "/team-logos/gimnasia.png",
      awayTeam: "/team-logos/nob.png",
      score: "1 - 0",
      resultType: "win",
    },
    {
      homeTeam: "/team-logos/nob.png",
      awayTeam: "/team-logos/huracan.png",
      score: "2 - 4",
      resultType: "loss",
    },
    {
      homeTeam: "/team-logos/union.png",
      awayTeam: "/team-logos/nob.png",
      score: "2 - 0",
      resultType: "loss",
    },
    {
      homeTeam: "/team-logos/nob.png",
      awayTeam: "/team-logos/sarmiento.png",
      score: "1 - 1",
      resultType: "draw",
    },
    {
      homeTeam: "/team-logos/godoy.png",
      awayTeam: "/team-logos/nob.png",
      score: "2 - 0",
      resultType: "loss",
    },
  ];

  return (
    <ThemedView className="flex-1 m-2">
      <ThemedView type="primary" className="p-4 rounded-xl space-y-4">
        <ThemedView className="flex-row items-center space-x-2">
          <MaterialCommunityIcons
            name="calendar-clock"
            size={24}
            color={colorScheme === "dark" ? "white" : "black"}
          />
          <ThemedText className=" text-lg">
            {formatDate(new Date(matchInfo.start_time))}{" "}
            {new Date(matchInfo.start_time)
              .toLocaleTimeString()
              .split(":")
              .slice(0, 2)
              .join(":")}
          </ThemedText>
        </ThemedView>

        <ThemedView className="flex-row items-center space-x-2">
          <Image
            source={{ uri: matchInfo.competition.logo }}
            resizeMode="contain"
            className="w-6 h-6"
          />
          <ThemedText className=" text-lg">
            {matchInfo.competition.name} - Round {matchInfo.round}
          </ThemedText>
        </ThemedView>

        <ThemedView className="flex-row items-center space-x-2">
          <MaterialCommunityIcons
            name="stadium"
            size={24}
            color={colorScheme === "dark" ? "white" : "black"}
          />
          <ThemedText className=" text-lg">
            {matchInfo.stadium.name} - {matchInfo.stadium.city}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView type="primary" className="p-4 mt-2 rounded-xl space-y-4">
        <ThemedText className="text-lg font-bold ">Team form</ThemedText>
        <ThemedView className="flex flex-row justify-between">
          <ThemedView className="w-1/3">
            <TeamForm teamId={matchInfo.homeTeamId} />
          </ThemedView>
          <ThemedView className="w-1/3">
            <TeamForm teamId={matchInfo.awayTeamId} />
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

export default MatchInfo;

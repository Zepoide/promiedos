import { Image, FlatList } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Container from "@/components/Container";
import { Team, TeamSummaryResponse } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import apiService from "@/services/api.service";
import { formatDate } from "@/lib/utils";
import TeamForm from "@/components/TeamForm";

import { ActivityIndicator } from "react-native";

const TeamOverview = ({ teamId }: { teamId: string }) => {
  const {
    data: teamInfo,
    isLoading,
    error,
  } = useQuery<TeamSummaryResponse>({
    queryKey: [`team-info-${teamId}`],
    queryFn: () => apiService.get(`/team/${teamId}/summary`),
  });

  if (isLoading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="green" />
      </Container>
    );
  }
  if (!teamInfo) {
    return (
      <Container>
        <ThemedText>Team not found</ThemedText>
      </Container>
    );
  }

  return (
    <ThemedView type="background" className="m-2 rounded-lg">
      <ThemedView type="primary" className="p-4 rounded-lg">
        <ThemedText className="text-lg font-bold">Next match</ThemedText>
        <ThemedView className="flex flex-col gap-2">
          <ThemedView className="flex flex-row justify-between">
            <ThemedText>
              {formatDate(new Date(teamInfo.next_match.start_time))}
            </ThemedText>
            <ThemedText>{teamInfo?.next_match.competition.name}</ThemedText>
          </ThemedView>
          <ThemedView className="flex flex-row justify-center items-center gap-2">
            <Image
              source={{
                uri: teamInfo.next_match.awayTeam.logo,
              }}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
            <ThemedText className="text-center font-bold text-lg">
              vs {teamInfo.next_match.awayTeam.name}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView type="primary" className="p-4 mt-2 rounded-lg">
        <ThemedText className="ThemedText-lg font-bold">Team Form</ThemedText>

        <ThemedView className="flex flex-row justify-between items-center">
          <TeamForm teamId={teamId} />
          <TeamForm teamId={teamId} skip={5} />
        </ThemedView>
      </ThemedView>
      {/* <ThemedView className="m-2">
        <StadiumInfo stadium={teamInfo.stadium} />
      </ThemedView> */}
    </ThemedView>
  );
};

export default TeamOverview;

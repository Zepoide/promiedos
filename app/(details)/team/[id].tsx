import { useState } from "react";
import { Image, FlatList } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Container from "@/components/Container";
import BackButton from "@/components/BackButton";
import FollowButton from "@/components/FollowButton";
import CustomTabView from "@/components/CustomTabView";
import { Team, TeamSummaryResponse } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import apiService from "@/services/api.service";
import MatchPreview from "@/components/MatchPreview";
import { formatDate } from "@/lib/utils";
import TeamForm from "@/components/TeamForm";
import { countries } from "@/constants/Countries";
import StadiumInfo from "@/components/StadiumInfo";
import { ScrollView } from "react-native-gesture-handler";
import { useLocalSearchParams } from "expo-router";
import { useAuthorizedUser } from "@/hooks/useUser";
import { ActivityIndicator } from "react-native";

const Overview = ({ teamId }: { teamId: string }) => {
  const recentMatches = [
    {
      id: 1,
      opponent: "River Plate",
      score: "1-1",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Escudo_del_C_A_River_Plate.svg/129px-Escudo_del_C_A_River_Plate.svg.png",
    },
    {
      id: 2,
      opponent: "Argentinos Jrs",
      score: "1-1",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Asociacion_Atletica_Argentinos_Juniors.svg/160px-Asociacion_Atletica_Argentinos_Juniors.svg.png",
    },
    {
      id: 3,
      opponent: "Belgrano",
      score: "1-1",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Escudo_Oficial_del_Club_Atl%C3%A9tico_Belgrano.png/190px-Escudo_Oficial_del_Club_Atl%C3%A9tico_Belgrano.png",
    },
    {
      id: 4,
      opponent: "Tigre",
      score: "1-0",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Escudo_del_Club_Atl%C3%A9tico_Tigre_-_2019.svg/125px-Escudo_del_Club_Atl%C3%A9tico_Tigre_-_2019.svg.png",
    },
    {
      id: 5,
      opponent: "Platense",
      score: "1-1",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Escudo_del_Club_Alt%C3%A9tico_Platense.svg/127px-Escudo_del_Club_Alt%C3%A9tico_Platense.svg.png",
    },
  ];

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

  console.log(
    JSON.stringify(
      {
        id: teamInfo.next_match.id,
        start_time: teamInfo.next_match.start_time,
        homeTeamId: teamInfo.next_match.homeTeamId,
        awayTeamId: teamInfo.next_match.awayTeamId,
        scoreHome: teamInfo.next_match.scoreHome ?? 0,
        scoreAway: teamInfo.next_match.scoreAway ?? 0,
        homeTeam: {
          name: teamInfo.next_match.homeTeam.name,
          logo: teamInfo.next_match.homeTeam.logo,
        },
        awayTeam: {
          name: teamInfo.next_match.awayTeam.name,
          logo: teamInfo.next_match.awayTeam.logo,
        },
      },
      null,
      2
    )
  );

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

const TeamDetails = () => {
  const { user, editUser } = useAuthorizedUser();

  const { id } = useLocalSearchParams();
  const teamId = Array.isArray(id) ? id[0] : id;
  const [following, setFollowing] = useState(
    user.followedTeams.some(({ id }) => teamId === id)
  );

  const {
    data: teamInfo,
    isLoading,
    error,
  } = useQuery<Team>({
    queryKey: [`team-${teamId}`],
    queryFn: () => apiService.get(`/team/${teamId}`),
  });

  const followTeam = async () => {
    try {
      const response = await apiService.post(
        `/${following ? "unfollow" : "follow"}/team/${id}`,
        {
          userId: user.id,
        }
      );

      const updatedUser = await response.json();

      setFollowing(!following);

      editUser(updatedUser);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <ThemedView className="flex flex-row justify-between items-center p-4">
        <BackButton />
        <FollowButton onPress={followTeam} following={following} />
      </ThemedView>

      <ThemedView className="flex flex-row justify-start m-3 p-3">
        <ThemedView className="basis-1/5">
          <Image
            source={{
              uri: teamInfo?.logo || undefined,
            }}
            style={{ width: 60, height: 60 }}
            defaultSource={require("@/assets/images/logo-placeholder.png")}
            resizeMode="contain"
          />
        </ThemedView>
        <ThemedView className="flex basis-2/3 justify-start">
          <ThemedText className="text-2xl text-center font-extrabold ">
            {teamInfo?.name}
          </ThemedText>
          <ThemedText className="text-gray-500 text-center">
            {countries[teamInfo?.country as keyof typeof countries]}
          </ThemedText>
        </ThemedView>
      </ThemedView>
      <CustomTabView
        tabs={["Overview"]}
        pages={[() => <Overview teamId={teamId} />]}
      />
    </Container>
  );
};

export default TeamDetails;

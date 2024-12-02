import { useState } from "react";
import { Image } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Container from "@/components/Container";
import BackButton from "@/components/BackButton";
import FollowButton from "@/components/FollowButton";
import CustomTabView from "@/components/CustomTabView";
import { Team } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import apiService from "@/services/api.service";
import { countries } from "@/constants/Countries";
import { useLocalSearchParams } from "expo-router";
// import { useAuthorizedUser } from "@/hooks/useUser";
import { userStore } from "@/store/userStore";
import TeamOverview from "@/pages/TeamOverview";
import * as SecureStore from "expo-secure-store";
import TeamPlayers from "@/pages/TeamPlayers";

const TeamDetails = () => {
  const { user, follow, unfollow } = userStore();

  const { id } = useLocalSearchParams();
  const teamId = Array.isArray(id) ? id[0] : id;
  const [following, setFollowing] = useState(
    user!.followedTeams.some(({ id }) => teamId === id)
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
      if (following) {
        await unfollow(teamId, "team");
      } else {
        await follow(teamId, "team");
      }
      setFollowing(!following);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <ThemedView className="flex flex-row justify-between items-center mx-2">
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
        tabs={["Overview", "Players"]}
        pages={[
          () => <TeamOverview teamId={teamId} />,
          () => <TeamPlayers teamId={teamId} />,
        ]}
      />
    </Container>
  );
};

export default TeamDetails;

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
import { useAuthorizedUser } from "@/hooks/useUser";
import TeamOverview from "@/pages/TeamOverview";

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
        pages={[() => <TeamOverview teamId={teamId} />]}
      />
    </Container>
  );
};

export default TeamDetails;

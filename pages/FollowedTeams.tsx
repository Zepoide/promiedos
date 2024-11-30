import FollowingCard from "@/components/FollowingCard";
import { ThemedText } from "@/components/ThemedText";
import { useAuthorizedUser } from "@/hooks/useUser";
import { Team } from "@/types/types";
import { FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";
import apiService from "@/services/api.service";
import { ActivityIndicator } from "react-native";
import Container from "@/components/Container";
export default function FollowedTeams({ teamsIds }: { teamsIds: any }) {
  const { user } = useAuthorizedUser();
  //   const followedTeams = user.followedTeams;
  const idsArray = teamsIds.map(({ id }: { id: string }) => id);

  const {
    data: followedTeams,
    isLoading,
    error,
  } = useQuery<Team[]>({
    queryFn: () => apiService.get(`/teams/${JSON.stringify(idsArray)}`),
    queryKey: [`team-${teamsIds}-summary`],
  });

  if (isLoading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="green" />
      </Container>
    );
  }

  if (followedTeams?.length === 0) {
    return (
      <ThemedText className="font-bold text-center text-xl m-auto">
        You do not follow any team
      </ThemedText>
    );
  }
  return (
    <FlatList
      data={followedTeams}
      renderItem={({ item }) => (
        <FollowingCard
          id={item.id}
          name={item.name}
          url={item.logo!}
          color={item.primary_color}
          text_color={item.number_color}
          type="team"
        />
      )}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "center" }}
    />
  );
}

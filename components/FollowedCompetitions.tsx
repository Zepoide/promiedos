import FollowingCard from "@/components/FollowingCard";
import { ThemedText } from "@/components/ThemedText";
import { useAuthorizedUser } from "@/hooks/useUser";
import { Team } from "@/types/types";
import { FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";
import apiService from "@/services/api.service";

export default function FollowedCompetitions({
  competitionsIds,
}: {
  competitionsIds: any;
}) {
  const { user } = useAuthorizedUser();
  //   const followedTeams = user.followedTeams;
  const idsArray = competitionsIds.map(({ id }: { id: string }) => id);
  console.log(idsArray);
  const {
    data: followedCompetitions,
    isLoading,
    error,
  } = useQuery<Team[]>({
    queryFn: () => apiService.get(`/competitions/${JSON.stringify(idsArray)}`),
    queryKey: [`competition-${competitionsIds}-info`],
  });

  if (isLoading) return <ThemedText>Loading...</ThemedText>;

  if (!followedCompetitions) {
    console.log(followedCompetitions);
    return (
      <ThemedText className="font-bold text-center text-xl">
        You do not follow any Competition
      </ThemedText>
    );
  }
  console.log("aca", followedCompetitions);

  return (
    <FlatList
      data={followedCompetitions}
      renderItem={({ item }) => (
        <FollowingCard
          id={item.id}
          name={item.name}
          url={item.logo!}
          color={item.primary_color}
          text_color={item.number_color}
        />
      )}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "center" }}
    />
  );
}

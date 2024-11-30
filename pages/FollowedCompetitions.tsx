import FollowingCard from "@/components/FollowingCard";
import { ThemedText } from "@/components/ThemedText";
// import { useAuthorizedUser } from "@/hooks/useUser";
import { userStore } from "@/store/userStore";
import { Team } from "@/types/types";
import { FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";
import apiService from "@/services/api.service";
import { ActivityIndicator } from "react-native";
import Container from "@/components/Container";
import Loader from "@/components/Loader";

export default function FollowedCompetitions({
  competitionsIds,
}: {
  competitionsIds: any;
}) {
  const { user } = userStore();
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

  if (isLoading) {
    return <Loader />;
  }

  if (followedCompetitions?.length === 0) {
    return (
      <ThemedText className="font-bold text-center text-xl m-auto">
        You do not follow any Competition
      </ThemedText>
    );
  }

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
          type="competition"
        />
      )}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "center" }}
    />
  );
}

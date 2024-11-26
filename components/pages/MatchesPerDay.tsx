import React from "react";
import { FlatList, ActivityIndicator, Pressable, Image } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import useMatches from "@/hooks/useMatches";
import CompetitionMatches from "../CompetitionMatches";
import { useAuthorizedUser } from "@/hooks/useUser";
import { IMatchPreview } from "@/types/types";
import apiService from "@/services/api.service";
import { useQuery } from "@tanstack/react-query";
import MatchPreview from "../MatchPreview";
import Container from "../Container";

interface MatchesPerDayProps {
  date: Date;
}

const MatchesPerDay = ({ date }: MatchesPerDayProps) => {
  const { data, isLoading } = useMatches(date);
  const { user } = useAuthorizedUser();
  const { data: followedTeamsMatches, isLoading: teamsIsLoading } = useQuery<
    IMatchPreview[]
  >({
    queryKey: [`matches-team-${date}`],
    queryFn: () =>
      apiService.get(
        `/matches/teams/${JSON.stringify(user.followedTeams)}?date=${date}`
      ),
  });

  if (isLoading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="green" />
      </Container>
    );
  }

  if (data?.length === 0) {
    return (
      <ThemedView className="flex-1 flex items-center p-4 bg-white dark:bg-black">
        <ThemedText className="font-extrabold">No matches today</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView
      type="background"
      className="flex-1 flex justify-center w-full "
    >
      {(followedTeamsMatches?.length ?? 0) > 0 ? (
        <ThemedView className="mt-2 mx-2 ">
          <ThemedView
            type="secondary"
            className={`flex flex-row p-3 justify-between items-center ${true ? "rounded-t-lg" : "rounded-lg"} `}
          >
            <ThemedView className="flex flex-row justify-center items-center">
              <ThemedText className="font-extrabold text-l">★</ThemedText>
              <ThemedText className="ml-2 font-extrabold text-l">
                Following
              </ThemedText>
            </ThemedView>
          </ThemedView>
          <ThemedView
            type="primary"
            className="flex justify-center  rounded-b-lg"
          >
            <FlatList
              data={followedTeamsMatches}
              renderItem={({ item, index }) => (
                <MatchPreview key={item.id} match={item}></MatchPreview>
              )}
              keyExtractor={(item) => item.id}
              bounces={false}
            ></FlatList>
          </ThemedView>
        </ThemedView>
      ) : null}

      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <CompetitionMatches {...item}></CompetitionMatches>
        )}
        keyExtractor={(item) => item.competitionId}
        bounces={false}
      ></FlatList>
    </ThemedView>
  );
};

export default MatchesPerDay;

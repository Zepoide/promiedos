import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Image, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import useMatches from "@/hooks/useMatches";
import CompetitionMatches from "@/components/CompetitionMatches";
import { userStore } from "@/store/userStore";
import { IMatchPreview } from "@/types/types";
import apiService from "@/services/api.service";
import { useQuery } from "@tanstack/react-query";
import MatchPreview from "@/components/MatchPreview";
import Loader from "@/components/Loader";
import AllMatches from "@/components/AllMatches";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";

interface FollowedMatchesResponse {
  followedTeams: IMatchPreview[];
  groupedByCompetition: {
    competitionId: string;
    competition: {
      id: string;
      name: string;
      country: string;
      logo: string;
    };
    matches: IMatchPreview[];
  }[];
}

interface MatchesPerDayProps {
  date: Date;
}

const MatchesPerDay = ({ date }: MatchesPerDayProps) => {
  const { user } = userStore();
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);

  const { data, isLoading, refetch } = useQuery<FollowedMatchesResponse>({
    queryKey: [
      `matches-followed-team-${date}`,
      user?.followedTeams,
      user?.followedCompetitions,
    ],
    queryFn: () =>
      apiService.get(
        `/matches?date=${date}&teamIds=${user?.followedTeams.map((team) => team.id).join(",")}&competitionIds=${user?.followedCompetitions.map((competition) => competition.id).join(",")}`
      ),
  });

  useEffect(() => {
    if (user?.followedTeams) {
      refetch();
    }
  }, [user?.followedTeams, refetch]);

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <ThemedText>Error</ThemedText>;
  }
  if (data?.followedTeams?.length === 0) {
    return (
      <ThemedView className="flex-1 flex items-center p-4 bg-white dark:bg-black">
        <ThemedText className="font-extrabold">No matches today</ThemedText>
      </ThemedView>
    );
  }

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    if (item.id === "followed") {
      return (
        <ThemedView className="mx-2">
          <ThemedView
            type="secondary"
            className={`flex flex-row p-3 justify-between items-center rounded-t-lg mt-2 `}
          >
            <ThemedView className="flex flex-row justify-center items-center">
              <ThemedText className="font-extrabold text-l">★</ThemedText>
              <ThemedText className="ml-2 font-extrabold text-l">
                Following
              </ThemedText>
            </ThemedView>
          </ThemedView>
          {item.data.map((match: IMatchPreview) => (
            <MatchPreview key={"followed" + match.id} match={match} />
          ))}
        </ThemedView>
      );
    }
    return (
      <CompetitionMatches
        competition={item.competition}
        matches={item.data}
      ></CompetitionMatches>
    );
  };

  const listData = [
    { id: "followed", data: data.followedTeams },
    ...data.groupedByCompetition.map((item) => ({
      id: item.competitionId,
      competition: item.competition,
      data: item.matches,
    })),
  ];

  return (
    <ThemedView
      type="background"
      className="flex-1 flex justify-center w-full mb-2"
    >
      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      {/* <TouchableOpacity onPress={() => setShowAll(!showAll)}>
        <ThemedText className="text-center p-4">
          {showAll ? "Hide All" : "Show All"}
        </ThemedText>
      </TouchableOpacity> */}
      {/* {showAll && <AllMatches date={date} />} */}
    </ThemedView>
  );
};

export default MatchesPerDay;

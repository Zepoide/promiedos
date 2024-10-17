import React from "react";
import { FlatList, View, ActivityIndicator, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useQuery } from "@tanstack/react-query";
import { type Match } from "@/types/types";
import MatchInfo from "./MatchInfo";

interface MatchesPerDayProps {
  date: string;
}

const simulateDataFetching = (delay = 1000): Promise<Match[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const simulatedData = [
        {
          id: "sr:sport_event:46655549",
          competitionId: "sr:season:114317",
          homeTeamId: "sr:competitor:42338",
          awayTeamId: "sr:competitor:4937",
          start_time: "2024-05-10T22:00:00+00:00",
          round: 1,
          scoreHome: 1,
          scoreAway: 2,
          status: "closed",
          venue: {
            id: "sr:venue:8975",
            name: "Estadio Eva Peron",
            capacity: 22000,
            city_name: "Junin",
            country_name: "Argentina",
            map_coordinates: "-34.585356,-60.929278",
            country_code: "ARG",
            timezone: "America/Argentina/Buenos_Aires",
          },
        },
        {
          id: "sr:sport_event:46655539",
          competitionId: "sr:season:114317",
          homeTeamId: "sr:competitor:3216",
          awayTeamId: "sr:competitor:3217",
          start_time: "2024-05-11T00:15:00+00:00",
          round: 1,
          scoreHome: 3,
          scoreAway: 2,
          status: "closed",
          venue: {
            id: "sr:venue:613",
            name: "Diego Armando Maradona",
            capacity: 26000,
            city_name: "Buenos Aires",
            country_name: "Argentina",
            map_coordinates: "-34.606323,-58.473167",
            country_code: "ARG",
            timezone: "America/Argentina/Buenos_Aires",
          },
        },
        {
          id: "sr:sport_event:46655557",
          competitionId: "sr:season:114317",
          homeTeamId: "sr:competitor:3212",
          awayTeamId: "sr:competitor:36837",
          start_time: "2024-05-11T00:15:00+00:00",
          round: 1,
          scoreHome: 2,
          scoreAway: 0,
          status: "closed",
          venue: {
            id: "sr:venue:1567",
            name: "Estadio Marcelo Bielsa",
            capacity: 38095,
            city_name: "Rosario",
            country_name: "Argentina",
            map_coordinates: "-32.955818,-60.659935",
            country_code: "ARG",
            timezone: "America/Argentina/Buenos_Aires",
          },
        },
      ];
      resolve(simulatedData);
    }, delay);
  });
};

const CompetitionMatches = (match: Match) => {
  return (
    <ThemedView className=" m-2  ">
      <ThemedView
        type="secondary"
        className="flex flex-row p-2 h-11 items-center rounded-t-lg   "
      >
        <ThemedText className="font-bold text-l mr-3"> ★ </ThemedText>
        <ThemedText className=" font-extrabold text-l">La Liga</ThemedText>
      </ThemedView>
      <MatchInfo match={match}></MatchInfo>
      <MatchInfo match={match}></MatchInfo>
      <MatchInfo match={match}></MatchInfo>
      <MatchInfo match={match}></MatchInfo>
    </ThemedView>
  );
};

const MatchesPerDay = ({ date }: MatchesPerDayProps) => {
  const { data, isLoading, error } = useQuery<Match[]>({
    queryKey: ["matches"],
    queryFn: () => simulateDataFetching(3000),
  });

  if (isLoading) {
    return (
      <ThemedView className="flex-1 flex justify-center items-center bg-white dark:bg-black">
        <ActivityIndicator size="large" color="red" />
      </ThemedView>
    );
  }

  if (!data) {
    return (
      <ThemedView className="flex-1 flex justify-center items-center bg-white dark:bg-black">
        <ThemedText>No data available</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView className="flex-1 flex justify-center items-center bg-white dark:bg-black">
        <ThemedText>Error: {(error as Error).message}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView className="flex-1 flex justify-center  bg-white dark:bg-black">
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <CompetitionMatches {...item}></CompetitionMatches>
        )}
      ></FlatList>
    </ThemedView>
  );
};

export default MatchesPerDay;

import { SafeAreaView, ActivityIndicator, Image } from "react-native";
import React from "react";

import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "nativewind";
import useStandings from "@/hooks/useStandings";
import fetchCompetitionDetails from "@/api/fetchCompetitionDetails";
import { CompetitionDetails } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

const Competition = () => {
  const { colorScheme } = useColorScheme();

  //   const standings = useStandings();

  const {
    data: competitionInfo,
    isLoading,
    error,
  } = useQuery<CompetitionDetails>({
    queryKey: ["competition"],
    queryFn: () => fetchCompetitionDetails("sr:season:114317"),
  });
  console.log(competitionInfo?.standings);
  return (
    <SafeAreaView style={{ backgroundColor: Colors[colorScheme].primary }}>
      <ThemedView className=" flex justify-center items-center p-3">
        {isLoading && (
          <ActivityIndicator size="large" color={Colors[colorScheme].text} />
        )}
        {error && (
          <ThemedText className="text-red-500">
            Error: {(error as Error).message}
          </ThemedText>
        )}
        {competitionInfo && (
          <ThemedView className="flex flex-row justify-start w-full p-3 gap-3 items-center">
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/8/85/Logo_lpf_afa.png",
              }}
              resizeMode="contain"
              style={{ width: 50, height: 50 }}
            />
            <ThemedView>
              <ThemedText className="text-2xl font-extrabold">
                {competitionInfo.name}
              </ThemedText>
              <ThemedText className="text-gray-500 capitalize font-semibold ">
                {competitionInfo.country}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        )}
      </ThemedView>
      <ThemedView
        type="background"
        className="flex h-full justify-center items-center"
      >
        {competitionInfo?.standings.map((standing) => (
          <ThemedView className="flex-row">
            <ThemedText>
              {standing.teamId}
              {"   "}{" "}
            </ThemedText>
            <ThemedText>
              {standing.points}
              {"   "}{" "}
            </ThemedText>
            <ThemedText>
              {standing.played}
              {"   "}{" "}
            </ThemedText>
            <ThemedText>
              {standing.win}
              {"   "}{" "}
            </ThemedText>
            <ThemedText>
              {standing.loss}
              {"  "}{" "}
            </ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
    </SafeAreaView>
  );
};

export default Competition;

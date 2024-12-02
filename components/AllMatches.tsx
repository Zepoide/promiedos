import React from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import useMatches from "@/hooks/useMatches";
import CompetitionMatches from "@/components/CompetitionMatches";
export default function AllMatches({ date }: { date: Date }) {
  const { data, isLoading } = useMatches(date);

  if (isLoading) {
    return (
      <ThemedView
        type="background"
        className="flex-1 flex justify-center items-center"
      >
        <ActivityIndicator size="large" color="green" />
      </ThemedView>
    );
  }

  return (
    <ThemedView
      type="background"
      className="flex-1 flex justify-center w-full mb-2"
    >
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <CompetitionMatches {...item}></CompetitionMatches>
        )}
        keyExtractor={(item) => item.competitionId}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

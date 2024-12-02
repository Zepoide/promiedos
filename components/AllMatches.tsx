import React, { useEffect } from "react";
import { FlatList, ActivityIndicator, Pressable, Image } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import useMatches from "@/hooks/useMatches";
import CompetitionMatches from "@/components/CompetitionMatches";
import { userStore } from "@/store/userStore";
import { IMatchPreview } from "@/types/types";
import apiService from "@/services/api.service";
import { useQuery } from "@tanstack/react-query";
import MatchPreview from "@/components/MatchPreview";
import Container from "@/components/Container";
import Loader from "@/components/Loader";

export default function AllMatches({ date }: { date: Date }) {
  const { data, isLoading } = useMatches(date);
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

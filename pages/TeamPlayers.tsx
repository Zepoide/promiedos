import React from "react";
import { ThemedText } from "@/components/ThemedText";
import Container from "@/components/Container";
import { useQuery } from "@tanstack/react-query";
import apiService from "@/services/api.service";
import { SectionList } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Image } from "react-native";
import { flags } from "@/constants/Flags";
import { countries } from "@/constants/Countries";

interface Player {
  id: string;
  name: string;
  teamId: string;
  position: string;
  number: number;
  country: string;
}

interface PlayersResponse {
  jerseys: {
    id: string;
    teamId: string;
    type: "third" | "away" | "home" | "goalkeeper";
    baseColor: string;
    sleeveColor: string;
    numberColor: string;
  }[];
  players: {
    forward: Player[];
    midfielder: Player[];
    defender: Player[];
    goalkeeper: Player[];
    unknown: Player[];
  };
  manager: string;
}

export default function TeamPlayers({ teamId: id }: { teamId: string }) {
  const {
    data: teamPlayers,
    isLoading,
    error,
  } = useQuery<PlayersResponse>({
    queryKey: [`team-players-${id}`],
    queryFn: () => apiService.get(`/team/${id}/players`),
  });

  if (isLoading) {
    return (
      <Container>
        <ThemedText>Loading...</ThemedText>
      </Container>
    );
  }

  const getShirtColor = (player: Player) => {
    if (player.position === "goalkeeper") {
      return teamPlayers?.jerseys.find((jersey) => jersey.type === "goalkeeper")
        ?.baseColor;
    }
    return teamPlayers?.jerseys.find((jersey) => jersey.type === "home")
      ?.baseColor;
  };

  const getShirtNumberColor = (player: Player) => {
    if (player.position === "goalkeeper") {
      return teamPlayers?.jerseys.find((jersey) => jersey.type === "goalkeeper")
        ?.numberColor;
    }
    return teamPlayers?.jerseys.find((jersey) => jersey.type === "home")
      ?.numberColor;
  };

  const getShirtSleeveColor = (player: Player) => {
    if (player.position === "goalkeeper") {
      return teamPlayers?.jerseys.find((jersey) => jersey.type === "goalkeeper")
        ?.sleeveColor;
    }
    return teamPlayers?.jerseys.find((jersey) => jersey.type === "home")
      ?.sleeveColor;
  };

  const renderItem = ({ item }: { item: Player }) => (
    <ThemedView
      type="primary"
      className="flex-row jusitfy-center items-center p-2 "
    >
      <ThemedView
        className={`rounded-full w-10 h-10 border-2 justify-center items-center`}
        style={{
          backgroundColor: `#${getShirtColor(item)}`,
          borderColor: `#${getShirtSleeveColor(item)}`,
        }}
      >
        <ThemedText
          className={` font-bold text-center`}
          style={{ color: "#" + getShirtNumberColor(item) }}
        >
          {item.number}
        </ThemedText>
      </ThemedView>
      <ThemedView className="flex ml-2 flex-col ">
        <ThemedText className="font-bold">{item.name}</ThemedText>
        <ThemedView className="flex-row justify-start items-center">
          <Image
            style={{ width: 16, height: 16 }}
            source={
              flags[
                Object.keys(flags).includes(item.country)
                  ? (item.country as keyof typeof flags)
                  : "ARG"
              ]
            }
          />
          <ThemedText className="ml-2 font-extrabold text-gray-500">
            {countries[item.country as keyof typeof countries]}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );

  const PlayerHeader = ({ title }: { title: string }) => (
    <ThemedView type="primary" className="mt-2 p-2 rounded-t-lg">
      <ThemedText className=" font-semibold">{title}</ThemedText>
    </ThemedView>
  );

  return (
    <ThemedView
      type="background"
      className="flex-row justify-between items-center"
    >
      <SectionList
        sections={[
          {
            title: "Goalkeepers",
            data: teamPlayers?.players.goalkeeper ?? [],
          },
          {
            title: "Defenders",
            data: teamPlayers?.players.defender ?? [],
          },
          {
            title: "Midfielders",
            data: teamPlayers?.players.midfielder ?? [],
          },
          {
            title: "Forwards",
            data: teamPlayers?.players.forward ?? [],
          },
        ]}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={({ section }) => (
          <PlayerHeader title={section.title} />
        )}
      />
    </ThemedView>
  );
}

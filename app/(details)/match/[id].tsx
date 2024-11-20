import { View, Text } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image, TouchableOpacity } from "react-native";
import { countries } from "@/constants/Countries";
import BackButton from "@/components/BackButton";
import Container from "@/components/Container";
import { useLocalSearchParams, useRouter } from "expo-router";
import useMatch from "@/hooks/useMatch";
import { formatDate } from "@/lib/utils";
import CustomTabView from "@/components/CustomTabView";
import TableStandings from "@/components/TableStandings";
import Head2Head from "@/components/Head2Head";
import MatchInfo from "@/components/MatchInfo";

const MatchDetails = () => {
  const { id } = useLocalSearchParams();
  const matchId = Array.isArray(id) ? id[0] : id;
  const { data: match, isLoading, error } = useMatch(matchId);
  const router = useRouter();

  if (isLoading) {
    return (
      <Container>
        <ThemedText>Loading...</ThemedText>
      </Container>
    );
  }

  if (!match) {
    return (
      <Container>
        <ThemedText>Match not found</ThemedText>
      </Container>
    );
  }

  return (
    <Container>
      <ThemedView className=" flex flex-row justify-between items-center mx-2">
        <BackButton />
      </ThemedView>
      <ThemedView className="flex flex-row justify-evenly items-center p-2">
        <ThemedView className="w-4/12 flex justify-center flex-col items-center gap-y-2">
          <TouchableOpacity
            onPress={() => router.push(`/team/${match.homeTeam.id}`)}
          >
            <Image
              resizeMode="contain"
              source={{
                uri:
                  match.homeTeam.logo ||
                  "https://upload.wikimedia.org/wikipedia/commons/3/36/Escudo_V%C3%A9lez_Sarsfield.png",
              }}
              className="w-12 h-12"
            />
          </TouchableOpacity>

          {/* <ThemedText className="text-center font-semibold">
            {match.homeTeam.name}
          </ThemedText> */}
        </ThemedView>
        <ThemedView className="w-2/12 flex flex-col   justify-center items-center">
          <ThemedText className=" m-auto font-semibold text-2xl">
            {match.status === "not_started"
              ? new Date(match.start_time)
                  .toLocaleTimeString()
                  .split(":")
                  .slice(0, 2)
                  .join(":")
              : `${match.scoreHome} - ${match.scoreAway}`}
          </ThemedText>
        </ThemedView>
        <ThemedView className="w-4/12 flex justify-center flex-col items-center  gap-y-2">
          <TouchableOpacity
            onPress={() => router.push(`/team/${match.awayTeam.id}`)}
          >
            <Image
              resizeMode="contain"
              source={{
                uri:
                  match.awayTeam.logo ||
                  "https://upload.wikimedia.org/wikipedia/commons/3/36/Escudo_V%C3%A9lez_Sarsfield.png",
              }}
              className="w-12 h-12"
            />
          </TouchableOpacity>
          {/* <ThemedText className="text-center font-semibold">
            {match.awayTeam.name}
          </ThemedText> */}
        </ThemedView>
      </ThemedView>
      <ThemedView className="flex flex-row justify-evenly items-center">
        <ThemedView className="w-4/12">
          <ThemedText className="text-center font-semibold">
            {match.homeTeam.name}
          </ThemedText>
        </ThemedView>
        <ThemedView className="w-2/12">
          <ThemedText className="text-center font-semibold">
            {formatDate(new Date(match.start_time))}
          </ThemedText>
        </ThemedView>
        <ThemedView className="w-4/12">
          <ThemedText className="text-center font-semibold">
            {match.awayTeam.name}
          </ThemedText>
        </ThemedView>
      </ThemedView>
      <CustomTabView
        tabs={["Info", "Table", "H2H"]}
        pages={[
          () => <MatchInfo matchId={match.id} />,
          () => <TableStandings competitionId={match.competitionId} />,
          () => <Head2Head matchId={match.id} />,
        ]}
      />
    </Container>
  );
};

export default MatchDetails;

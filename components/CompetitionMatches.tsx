import React from "react";
import { Image, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IMatchPreview } from "@/types/types";
import MatchPreview from "./MatchPreview";
import { useRouter } from "expo-router";
import { Competition } from "../types/types";
import { flags } from "../constants/Flags";
import { countries } from "@/constants/Countries";
import { FlatList } from "react-native-gesture-handler";

const CompetitionMatches = ({
  competition,
  matches,
}: {
  competition: Competition;
  matches: IMatchPreview[];
}) => {
  const router = useRouter();

  if (!matches || matches.length === 0) {
    return null;
  }

  return (
    <ThemedView className="mt-2 mx-2 ">
      <Pressable
        onPress={() => {
          router.push({
            pathname: "/(details)/competition/[id]",
            params: { id: competition.id },
          });
        }}
      >
        <ThemedView
          type="secondary"
          className={`flex flex-row p-3 justify-between items-center rounded-t-lg  `}
        >
          <ThemedView className="flex flex-row justify-center items-center">
            <Image
              style={{ width: 16, height: 16 }}
              source={flags[competition.country as keyof typeof flags]}
            />

            <ThemedText className="ml-2 font-extrabold text-l">
              {countries[competition.country as keyof typeof countries]} -{" "}
              {competition.name}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </Pressable>

      <ThemedView type="primary" className="rounded-b-lg">
        {matches.map((match) => (
          <MatchPreview
            key={"competition" + match.id}
            match={match}
          ></MatchPreview>
        ))}
      </ThemedView>
    </ThemedView>
  );
};

export default CompetitionMatches;

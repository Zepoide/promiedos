import React, { useState } from "react";
import { Image, Pressable, TouchableOpacity, FlatList } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IMatchPreview } from "@/types/types";
import MatchPreview from "./MatchPreview";
import { Link, useRouter } from "expo-router";
import { Competition } from "../types/types";
import { flags } from "../constants/Flags";
import { countries } from "@/constants/Countries";
import Icon from "./Icon";
import { useAuthorizedUser } from "@/hooks/useUser";

const CompetitionMatches = ({
  competition,
  matches,
}: {
  competition: Competition;
  matches: IMatchPreview[];
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <ThemedView className="mt-2 mx-2 ">
      <ThemedView
        type="secondary"
        className={`flex flex-row p-3 justify-between items-center ${isOpen ? "rounded-t-lg" : "rounded-lg"} `}
      >
        <Pressable
          onPress={() => {
            router.push({
              pathname: "/(details)/competition/[id]",
              params: { id: competition.id },
            });
          }}
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
        </Pressable>
        <TouchableOpacity onPress={() => setIsOpen((value) => !value)}>
          <Icon
            name={isOpen ? `chevron-up` : `chevron-down`}
            size={16}
            color={"gray"}
          />
        </TouchableOpacity>
      </ThemedView>
      {isOpen && (
        <ThemedView type="primary" className="rounded-b-lg">
          {matches.map((match) => (
            <MatchPreview key={match.id} match={match}></MatchPreview>
          ))}
        </ThemedView>
      )}
    </ThemedView>
  );
};

export default CompetitionMatches;

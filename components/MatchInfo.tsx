import React from "react";
import { Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Match } from "../types/types";

interface MatchInfoProps {
  match: Match;
}

const MatchInfo = ({ match }: MatchInfoProps) => {
  return (
    <ThemedView className="flex flex-row justify-center gap-2 w-full p-5">
      {/* Home Team */}
      <ThemedView className="flex  justify-end items-center">
        <ThemedText className="font-semibold text-base">
          {/* {match.homeTeamId} */}
          River Plate
        </ThemedText>
      </ThemedView>

      {/* Home Team Logo */}
      <ThemedView className="flex justify-center items-center ">
        <Image
          resizeMode="contain"
          source={{ uri: "https://crests.football-data.org/6667.png" }}
          className="w-[25px] h-[25px]"
        />
      </ThemedView>

      {/* Match Time */}
      <ThemedView className="flex justify-center items-center ">
        <ThemedText className="text-[#8D8D8D] font-bold">
          {new Date(match.start_time)
            .toLocaleTimeString()
            .split(":")
            .slice(0, 2)
            .join(":")}
        </ThemedText>
      </ThemedView>

      {/* Away Team Logo */}
      <ThemedView className="flex justify-center items-center ">
        <Image
          resizeMode="contain"
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/3/36/Escudo_V%C3%A9lez_Sarsfield.png",
          }}
          className="w-[25px] h-[25px]"
        />
      </ThemedView>

      {/* Away Team */}
      <ThemedView className="flex flex-row justify-start  ">
        <ThemedText className="font-semibold text-base ">
          {/* {match.awayTeamId} */}
          Velez Sarfield
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

export default MatchInfo;

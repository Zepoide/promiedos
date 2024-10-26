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
    <ThemedView
      type="primary"
      className="flex flex-row justify-evenly items-center w-full p-5 rounded-b-lg"
    >
      {/* Home Team */}
      <ThemedView className="flex flex-row justify-end items-center flex-[2.5]">
        <ThemedText className="font-semibold text-base">
          {/* {match.homeTeamId} */}
          River Plate
        </ThemedText>
      </ThemedView>

      {/* Home Team Logo */}
      <ThemedView className="flex justify-center items-center flex-[1]">
        <Image
          resizeMode="contain"
          source={{ uri: "https://crests.football-data.org/6667.png" }}
          className="w-[25px] h-[25px]"
        />
      </ThemedView>

      {/* Match Time */}
      <ThemedView className="flex justify-center items-center flex-[0.8]">
        <ThemedText className="text-[#8D8D8D] font-bold">
          {new Date(match.start_time)
            .toLocaleTimeString()
            .split(":")
            .slice(0, 2)
            .join(":")}
        </ThemedText>
      </ThemedView>

      {/* Away Team Logo */}
      <ThemedView className="flex justify-center items-center flex-[1]">
        <Image
          resizeMode="contain"
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/3/36/Escudo_V%C3%A9lez_Sarsfield.png",
          }}
          className="w-[25px] h-[25px]"
        />
      </ThemedView>

      {/* Away Team */}
      <ThemedView className="flex flex-row justify-start  flex-[2.5]">
        <ThemedText className="font-semibold text-base ">
          {/* {match.awayTeamId} */}
          Velez Sarfield
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

export default MatchInfo;

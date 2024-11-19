import React from "react";
import { Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { MatchPreview } from "../types/types";

interface MatchInfoProps {
  match: MatchPreview;
}

const MatchInfo = ({ match }: MatchInfoProps) => {
  return (
    <ThemedView className="flex-1 flex-row justify-around w-full py-4 px-5 border-t border-[#fafafa] dark:border-zinc-800">
      <ThemedView className="flex-1 flex-col justify-center items-end mr-2 ">
        <ThemedText className="font-semibold text-sm text-right">
          {match.homeTeam.name}
        </ThemedText>
      </ThemedView>
      <ThemedView className="flex flex-row justify-evenly itemes-center m-auto gap-x-2">
        <Image
          resizeMode="contain"
          source={{
            uri:
              match.homeTeam.logo ||
              "https://upload.wikimedia.org/wikipedia/commons/3/36/Escudo_V%C3%A9lez_Sarsfield.png",
          }}
          className="w-6 h-6"
        />

        <ThemedText className="text-gray-500 m-auto font-bold">
          {new Date(match.start_time)
            .toLocaleTimeString()
            .split(":")
            .slice(0, 2)
            .join(":")}
        </ThemedText>

        <Image
          resizeMode="contain"
          source={{
            uri:
              match.awayTeam.logo ||
              "https://upload.wikimedia.org/wikipedia/commons/3/36/Escudo_V%C3%A9lez_Sarsfield.png",
          }}
          className="w-6 h-6"
        />
      </ThemedView>
      <ThemedView className="flex-1 flex-row items-center ml-2">
        <ThemedText className="font-semibold text-sm text-left">
          {match.awayTeam.name}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

export default MatchInfo;

import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface StadiumInfoProps {
  stadium: {
    name: string;
    city: string;
    country: string;
    capacity: number;
  };
}

export default function StadiumInfo({ stadium }: StadiumInfoProps) {
  return (
    <ThemedView type="primary" className=" rounded-lg p-2 mt-2">
      <ThemedText className=" text-2xl font-bold mb-6">Stadium</ThemedText>

      <ThemedView className="flex-row items-center justify-between mb-4">
        <ThemedView className="flex-row items-center flex-1">
          <MaterialCommunityIcons
            name="stadium"
            size={32}
            color="#666"
            style={{ marginRight: 16 }}
          />
          <ThemedView className="flex-1">
            <ThemedText className=" text-xl font-semibold">
              {stadium.name}
            </ThemedText>
            <ThemedText className="text-gray-400 text-base">
              {stadium.city}, {stadium.country}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView className="h-[1px] bg-gray-400 my-6" />

      <ThemedView className="flex-row justify-around">
        <ThemedView className="items-center">
          <ThemedText className="text-xl font-semibold">
            {stadium.capacity.toLocaleString()}
          </ThemedText>
          <ThemedText className="text-gray-400 uppercase text-sm">
            CAPACITY
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

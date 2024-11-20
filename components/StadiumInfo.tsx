import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface StadiumInfoProps {
  team: {
    stadium: {
      name: string;
      city: string;
      country: string;
      capacity: number;
    };
  };
}

export default function StadiumInfo({
  team = {
    stadium: {
      name: "Alberto Jose Armando",
      city: "Buenos Aires",
      country: "Argentina",
      capacity: 49000,
    },
  },
}: StadiumInfoProps) {
  return (
    <View className="bg-[#1c1c1c] rounded-3xl p-6 m-4">
      <Text className="text-white text-2xl font-bold mb-6">Stadium</Text>

      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center flex-1">
          <MaterialCommunityIcons
            name="stadium"
            size={32}
            color="#666"
            style={{ marginRight: 16 }}
          />
          <View>
            <Text className="text-white text-xl font-semibold">
              {team.stadium.name}
            </Text>
            <Text className="text-gray-400 text-base">
              {team.stadium.city}, {team.stadium.country}
            </Text>
          </View>
        </View>
        <View className="bg-green-600 rounded-full p-2">
          <MaterialCommunityIcons name="map-marker" size={24} color="white" />
        </View>
      </View>

      <View className="h-[1px] bg-gray-800 my-6" />

      <View className="flex-row justify-between">
        <View>
          <Text className="text-white text-xl font-semibold">Grass</Text>
          <Text className="text-gray-400 uppercase text-sm">SURFACE</Text>
        </View>
        <View className="items-center">
          <Text className="text-white text-xl font-semibold">
            {team.stadium.capacity.toLocaleString()}
          </Text>
          <Text className="text-gray-400 uppercase text-sm">CAPACITY</Text>
        </View>
        <View className="items-end">
          <Text className="text-white text-xl font-semibold">1940</Text>
          <Text className="text-gray-400 uppercase text-sm">OPENED</Text>
        </View>
      </View>
    </View>
  );
}

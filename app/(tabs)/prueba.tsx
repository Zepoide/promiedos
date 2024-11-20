import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface MatchResult {
  homeTeam: string;
  awayTeam: string;
  score: string;
  resultType: "win" | "loss" | "draw";
}

export default function CompetitionDetails() {
  const matchResults: MatchResult[] = [
    {
      homeTeam: "/team-logos/gimnasia.png",
      awayTeam: "/team-logos/nob.png",
      score: "1 - 0",
      resultType: "win",
    },
    {
      homeTeam: "/team-logos/nob.png",
      awayTeam: "/team-logos/huracan.png",
      score: "2 - 4",
      resultType: "loss",
    },
    {
      homeTeam: "/team-logos/union.png",
      awayTeam: "/team-logos/nob.png",
      score: "2 - 0",
      resultType: "loss",
    },
    {
      homeTeam: "/team-logos/nob.png",
      awayTeam: "/team-logos/sarmiento.png",
      score: "1 - 1",
      resultType: "draw",
    },
    {
      homeTeam: "/team-logos/godoy.png",
      awayTeam: "/team-logos/nob.png",
      score: "2 - 0",
      resultType: "loss",
    },
  ];

  return (
    <View className="flex-1 bg-black">
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#111" },
          headerTintColor: "#fff",
        }}
      />

      <ScrollView className="flex-1">
        {/* Match Info Header */}
        <View className="p-4 space-y-4">
          <View className="flex-row items-center space-x-2">
            <MaterialCommunityIcons
              name="television-classic"
              size={24}
              color="white"
            />
            <Text className="text-white text-lg">
              TNT Sports / Estadio TNT Sports
            </Text>
          </View>

          <View className="flex-row items-center space-x-2">
            <MaterialCommunityIcons
              name="calendar-clock"
              size={24}
              color="white"
            />
            <Text className="text-white text-lg">Today 17:00</Text>
          </View>

          <View className="flex-row items-center space-x-2">
            <Image
              source={{ uri: "/placeholder.svg?height=24&width=24" }}
              className="w-6 h-6"
            />
            <Text className="text-white text-lg">
              Liga Profesional - Round 23
            </Text>
          </View>

          <View className="flex-row items-center space-x-2">
            <MaterialCommunityIcons name="stadium" size={24} color="white" />
            <Text className="text-white text-lg">
              Estadio Marcelo Alberto Bielsa, Rosario, Provincia de Santa Fe,
              Argentina
            </Text>
          </View>

          <View className="flex-row items-center space-x-2">
            <MaterialCommunityIcons name="whistle" size={24} color="white" />
            <Image
              source={{ uri: "/placeholder.svg?height=20&width=20" }}
              className="w-5 h-5"
            />
            <Text className="text-white text-lg">Jorge Ignacio Baliño</Text>
          </View>
        </View>

        {/* Team Form Section */}
        <View className="p-4">
          <Text className="text-white text-2xl mb-4">Team form</Text>

          <View className="space-y-4">
            {matchResults.map((result, index) => (
              <View
                key={index}
                className="flex-row items-center justify-between"
              >
                <Image
                  source={{ uri: result.homeTeam }}
                  className="w-10 h-10"
                />
                <View
                  className={`px-4 py-2 rounded-md ${
                    result.resultType === "win"
                      ? "bg-red-500"
                      : result.resultType === "loss"
                        ? "bg-gray-500"
                        : "bg-gray-600"
                  }`}
                >
                  <Text className="text-white font-bold">{result.score}</Text>
                </View>
                <Image
                  source={{ uri: result.awayTeam }}
                  className="w-10 h-10"
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

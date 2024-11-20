import { SafeAreaView, FlatList, Pressable, ScrollView } from "react-native";
import { useColorScheme } from "nativewind";
import React, { useEffect, useRef, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import PagerView from "react-native-pager-view";
import { ThemedView } from "@/components/ThemedView";
import TableStandings from "@/components/TableStandings";
import useCompetition from "@/hooks/useCompetition";

const sections = [
    "Standings",
    "Matches",
    "News",
    "Estad. Jugador",
    "Estad. Equipos",
    "Fichajes",
    "TOTW",
    "Temporadas",
];

const info = ["Resumed", "Complete", "W/L"];

const Standings = () => {
    const { colorScheme } = useColorScheme();

    const { competitionInfo, isLoading, error } =
        useCompetition("sr:season:114317");

    if (isLoading) {
        return <ThemedText>Loading...</ThemedText>;
    }

    const riverLogo = "https://crests.football-data.org/6667.png";

    const data = competitionInfo?.map((item) => {
        const goalDifference = item.goals_for - item.goals_against;
        const formattedGoalDifference =
            goalDifference > 0 ? `+${goalDifference}` : `${goalDifference}`;
        const logo = item.team.logo ? item.team.logo : riverLogo;
        return [
            item.position,
            logo,
            item.team.name,
            item.played,
            formattedGoalDifference,
            item.points,
        ];
    });

    const columns = ["#", "Team", "J", "GD", "PTS"];

    return (
        <SafeAreaView
            style={{
                flexDirection: "column",
                alignContent: "center",
                flex: 1,
                backgroundColor: Colors[colorScheme ?? "dark"].background,
            }}
        >
            <ThemedView className="flex-row justify-between items-center bg-white dark:bg-dark-primary">
                <ThemedText className="text-2xl font-extrabold p-3">
                    STANDINGS
                </ThemedText>
            </ThemedView>

            <TableStandings columns={columns} data={data} />

            <ThemedView className="w-full flex-row items-center pl-6 pb-2">
                <ThemedView className="w-3 h-3 bg-green-500 mr-2 rounded-sm" />
                <ThemedText>Campeon Liga Argentina</ThemedText>
            </ThemedView>
        </SafeAreaView>
    );
};

export default Standings;

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

    // TODO: arreglar la llamada de hooks, no funciona el fetch de datos

    const data = competitionInfo.map((item) => {
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

    const pagerRef = useRef<PagerView>(null);
    const flatListRef = useRef<FlatList<string>>(null);

    const [selectedSection, setSelectedSection] = useState(sections[0]);
    const [selectedInfo, setSelectedInfo] = useState(info[0]);

    const handleSectionPress = (section: string, index: number) => {
        setSelectedSection(section);
        flatListRef.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.5,
        });
        pagerRef.current?.setPageWithoutAnimation(index);
    };

    const handleInfoPress = (info: string, index: number) => {
        setSelectedInfo(info);
        flatListRef.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.5,
        });
        pagerRef.current?.setPageWithoutAnimation(index);
    };

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
            <ThemedView className="flex-row justify-center items-center">
                <FlatList
                    ref={flatListRef}
                    data={sections}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        justifyContent: "center",
                        backgroundColor:
                            colorScheme === "light" ? "#fff" : "#1B1B1B",
                        height: 80,
                    }}
                    renderItem={({ item, index }) => (
                        <Pressable
                            onPress={() => handleSectionPress(item, index)}
                            className={`p-3 flex justify-center items-center border-b-2 ${selectedSection === item ? "border-light-tint dark:border-[#84DC7B]" : "border-transparent"}`}
                        >
                            <ThemedText
                                className={`text-base font-bold ${selectedSection === item ? `text-${colorScheme}-text` : "text-gray-500"}`}
                            >
                                {item}
                            </ThemedText>
                        </Pressable>
                    )}
                    getItemLayout={(_, index) => ({
                        length: 100,
                        offset: 100 * index,
                        index,
                    })}
                />
            </ThemedView>
            <ThemedView className="flex-row justify-center items-center">
                <FlatList
                    ref={flatListRef}
                    data={info}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        justifyContent: "center",
                        backgroundColor: Colors[colorScheme ?? "dark"].primary,
                        borderRadius: 24,
                        marginTop: 20,
                        gap: 6,
                        height: 40,
                    }}
                    renderItem={({ item, index }) => (
                        <Pressable
                            onPress={() => handleInfoPress(item, index)}
                            className={`p-1 flex justify-center items-center rounded-full duration-300 ease-in-out ${selectedInfo === item ? "bg-gray-500" : "bg-transparent"}`}
                        >
                            <ThemedText
                                className={`text-base font-bold ${selectedInfo === item ? `text-green-400` : "text-white"}`}
                            >
                                {item}
                            </ThemedText>
                        </Pressable>
                    )}
                    getItemLayout={(_, index) => ({
                        length: 100,
                        offset: 100 * index,
                        index,
                    })}
                />
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

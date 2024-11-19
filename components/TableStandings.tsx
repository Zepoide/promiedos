import React, { useState } from "react";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { ScrollView, Image, TouchableOpacity } from "react-native";
import useStandings from "@/hooks/useStandings";

interface TableProps {
    competitionId: string;
    initialTab?: number;
    onTabChange?: (index: number) => void;
}

const Table: React.FC<TableProps> = ({
    competitionId,
    initialTab = 0,
    onTabChange,
}) => {
    const { standings, isLoading } = useStandings(competitionId);
    const columns = ["#", "Team", "P", "GD", "PTS"];
    const tabs = ["Resumed", "Complete", "W/L"];
    const [activeTab, setActiveTab] = useState(initialTab);

    if (isLoading) {
        return <ThemedText>Loading...</ThemedText>;
    }

    const data = standings?.map((item) => {
        const goalDifference = item.goals_for - item.goals_against;
        const formattedGoalDifference =
            goalDifference > 0 ? `+${goalDifference}` : `${goalDifference}`;
        return [
            item.position,
            item.team.logo,
            item.team.name,
            item.played,
            formattedGoalDifference,
            item.points,
        ];
    });

    const handleTabPress = (index: number) => {
        setActiveTab(index);
        onTabChange?.(index);
    };

    return (
        <>
            <ThemedView type="primary" className="py-1 px-3">
                <ThemedView
                    type="secondary"
                    className="flex-row rounded-full p-1"
                >
                    {tabs.map((tab, index) => (
                        <TouchableOpacity
                            key={tab}
                            className={`flex-1 py-1 rounded-full items-center justify-center ${
                                index === activeTab ? "bg-[#575757]" : ""
                            }`}
                            onPress={() => handleTabPress(index)}
                        >
                            <ThemedText
                                className={`text-xs font-semibold ${
                                    index === activeTab
                                        ? "text-green-500"
                                        : "text-white"
                                }`}
                            >
                                {tab}
                            </ThemedText>
                        </TouchableOpacity>
                    ))}
                </ThemedView>
            </ThemedView>

            <ThemedView
                type="secondary"
                className="m-4 mt-2 p-2 rounded-lg flex-1"
            >
                {/* Table Header */}
                <ThemedView className="flex-row justify-start dark:bg-dark-secondary mb-0.5">
                    {columns.map((col, index) => (
                        <ThemedText
                            key={index}
                            className={`p-2 mb-1 text-xs bg-white dark:bg-dark-secondary text-center ${
                                index === 1 ? "w-[54%] text-left" : "w-[12%]"
                            }`}
                        >
                            {col}
                        </ThemedText>
                    ))}
                </ThemedView>
                {/* Table Rows */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {data?.map((row, rowIndex) => (
                        <ThemedView
                            key={rowIndex}
                            className={`flex-row justify-between items-center bg-white dark:bg-dark-secondary p-2 mb-0.5 ${
                                rowIndex === 0
                                    ? "border-l-2 border-green-500 pl-1.5"
                                    : ""
                            }`}
                        >
                            {row.map((cell, cellIndex) => (
                                <React.Fragment key={cellIndex}>
                                    {cellIndex === 1 ? (
                                        <ThemedView className="pl-2">
                                            <Image
                                                resizeMode="contain"
                                                source={{
                                                    uri: cell as string,
                                                }}
                                                className="w-[20px] h-[20px]"
                                            />
                                        </ThemedView>
                                    ) : (
                                        <ThemedText
                                            className={`text-center text-xs text-gray-600 dark:text-gray-200 ${
                                                cellIndex === 2
                                                    ? "w-[49%] text-left pl-2"
                                                    : "w-[12%]"
                                            } ${cellIndex === 0 ? "text-right mr-4 w-[5%]" : ""}`}
                                        >
                                            {cell}
                                        </ThemedText>
                                    )}
                                </React.Fragment>
                            ))}
                        </ThemedView>
                    ))}
                </ScrollView>
            </ThemedView>
        </>
    );
};

export default Table;

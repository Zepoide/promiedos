import React, { useState } from "react";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { ScrollView, Image, TouchableOpacity } from "react-native";
import useStandings from "@/hooks/useStandings";
import { ActivityIndicator } from "react-native";
import Container from "./Container";

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
  const tabs = ["Resumed", "Complete", "W/L"];

  const differentTabs = [
    ["#", "Team", "P", "GD", "PTS"],
    ["#", "Team", "P", "W", "D", "L", "+/-", "GD", "PTS"],
    ["#", "Team", "Last 5 games"],
  ];

  const [activeTab, setActiveTab] = useState(initialTab);
  const columns = differentTabs[activeTab];

  if (isLoading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="green" />
      </Container>
    );
  }
  const data = standings?.map((item) => {
    const goalDifference = item.goals_for - item.goals_against;
    const formattedGoalDifference =
      goalDifference > 0 ? `+${goalDifference}` : `${goalDifference}`;

    if (activeTab === 0) {
      return [
        item.position,
        item.team.logo,
        item.team.name,
        item.played,
        formattedGoalDifference,
        item.points,
      ];
    } else if (activeTab === 1) {
      const goals = `${item.goals_for}-${item.goals_against}`;
      return [
        item.position,
        item.team.logo,
        item.team.name,
        item.played,
        item.win,
        item.draw,
        item.loss,
        goals,
        formattedGoalDifference,
        item.points,
      ];
    } else if (activeTab === 2) {
      return [item.position, item.team.logo, item.team.name, item.form];
    } else {
      throw new Error("Standings not found");
    }
  });

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    onTabChange?.(index);
  };

  return (
    <>
      <ThemedView type="primary" className="py-1 px-3">
        <ThemedView type="secondary" className="flex-row rounded-full p-1">
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={tab}
              className={`flex-1 py-1 rounded-full items-center justify-center ${
                index === activeTab ? "dark:bg-[#575757]" : ""
              }`}
              onPress={() => handleTabPress(index)}
            >
              <ThemedText
                className={`text-xs font-semibold ${
                  index === activeTab ? "text-green-500" : "text-white"
                }`}
              >
                {tab}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ThemedView>

      <ThemedView type="secondary" className="m-4 mt-2 p-2 rounded-lg flex-1">
        {/* Table Header */}
        <ThemedView className="flex-row justify-start dark:bg-dark-secondary mb-0.5">
          {columns.map((col, index) => {
            const headerStyles = [
              ["w-[12%]", "w-[54%] text-left", "w-[12%]", "w-[12%]", "w-[12%]"], // Resumed
              [
                "w-[12%]",
                "w-[25%] text-left",
                "w-[8%]",
                "w-[8%]",
                "w-[8%]",
                "w-[8%]",
                "w-[10%]",
                "w-[10%]",
                "w-[12%]",
              ], // Complete
              ["w-[12%]", "w-[57%] text-left", "w-[30%]"], // W/L
            ];

            const widthClass = headerStyles[activeTab]?.[index] || "w-auto";

            return (
              <ThemedText
                key={index}
                className={`p-2 mb-1 text-xs bg-white dark:bg-dark-secondary text-center ${widthClass}`}
              >
                {col}
              </ThemedText>
            );
          })}
        </ThemedView>

        {/* Table Rows */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {data?.map((row, rowIndex) => (
            <ThemedView
              key={rowIndex}
              className={`flex-row justify-between items-center bg-white dark:bg-dark-secondary p-2 mb-0.5 ${
                rowIndex === 0 ? "border-l-2 border-green-500 pl-1.5" : ""
              }`}
            >
              {row.map((cell, cellIndex) => {
                const headerStyles = [
                  [
                    "w-[5%]",
                    "w-[10%]",
                    "w-[48%] text-left",
                    "w-[12%]",
                    "w-[12%]",
                    "w-[12%]",
                  ], // Resumed
                  [
                    "w-[5%]",
                    "w-[10%]",
                    "w-[17%] text-left",
                    "w-[8%]",
                    "w-[8%]",
                    "w-[8%]",
                    "w-[8%]",
                    "w-[12%]",
                    "w-[12%]",
                    "w-[12%]",
                  ], // Complete
                  ["w-[5%]", "w-[10%]", "w-[48%] text-left", `w-[35%]`], // W/L
                ];

                const widthClass =
                  headerStyles[activeTab]?.[cellIndex] || "w-auto";

                if (
                  activeTab === 2 &&
                  cellIndex === 3 &&
                  typeof cell === "string"
                ) {
                  return (
                    <ThemedView
                      key={cellIndex}
                      className={`flex-row justify-start ${widthClass}`}
                    >
                      {cell.split("").map((result, resultIndex) => {
                        const resultColor =
                          result === "W"
                            ? "bg-green-500"
                            : result === "D"
                              ? "bg-gray-500"
                              : result === "L"
                                ? "bg-red-500"
                                : "";

                        return (
                          <ThemedText
                            key={resultIndex}
                            className={`text-xs text-white w-[18px] text-center px-1 py-0.5 mx-0.5 rounded ${resultColor}`}
                          >
                            {result}
                          </ThemedText>
                        );
                      })}
                    </ThemedView>
                  );
                }

                // Default rendering for other cells
                return (
                  <React.Fragment key={cellIndex}>
                    {cellIndex === 1 ? (
                      <ThemedView className={`pl-2 ${widthClass}`}>
                        <Image
                          resizeMode="contain"
                          source={{
                            uri: cell as string,
                          }}
                          defaultSource={require("@/assets/images/logo-placeholder.png")}
                          className="w-[20px] h-[20px]"
                        />
                      </ThemedView>
                    ) : (
                      <ThemedText
                        className={`text-center text-xs text-gray-600 dark:text-gray-200 ${widthClass} ${
                          cellIndex === 0 ? "text-right mr-4" : ""
                        }`}
                      >
                        {cell}
                      </ThemedText>
                    )}
                  </React.Fragment>
                );
              })}
            </ThemedView>
          ))}
        </ScrollView>
      </ThemedView>
    </>
  );
};
export default Table;

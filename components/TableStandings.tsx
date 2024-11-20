import React from "react";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { ScrollView, Image } from "react-native";
import useStandings from "@/hooks/useStandings";

interface TableProps {
  competitionId: string;
  highlatedTeams?: string[];
}

const Table: React.FC<TableProps> = ({ competitionId }) => {
  const { standings, isLoading } = useStandings(competitionId);
  const columns = ["#", "Team", "J", "GD", "PTS"];

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

  return (
    <ThemedView type="secondary" className="m-4 p-2 rounded-lg flex-1">
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
              rowIndex === 0 ? "border-l-2 border-green-500 pl-1.5" : ""
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
                      cellIndex === 2 ? "w-[49%] text-left pl-2" : "w-[12%]"
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
  );
};

export default Table;

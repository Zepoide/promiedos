import React from "react";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { ScrollView, Image } from "react-native";

interface TableProps {
    columns: string[];
    data: (string | number)[][];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
    return (
        <ThemedView className="bg-white dark:bg-dark-secondary m-4 p-2 rounded-lg flex-1">
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
                {data.map((row, rowIndex) => (
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
    );
};

export default Table;

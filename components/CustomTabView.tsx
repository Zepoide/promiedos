import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import fetchCompetitionDetails from "@/api/fetchCompetitionDetails";
import { CompetitionDetails } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { Image } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router";

interface CustomTabViewProps {
  tabs: string[];
  pages: Function[];
}

export default function CustomTabView({ tabs, pages }: CustomTabViewProps) {
  const [index, setIndex] = useState(0);
  const [routes] = useState(
    tabs.map((tab) => {
      return { key: tab, title: tab };
    })
  );

  const sceneMapObject = tabs.reduce((acc: any, key, index) => {
    acc[key] = pages[index];
    return acc;
  }, {});

  const renderScene = SceneMap(sceneMapObject);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      renderLabel={({ route, focused }) => (
        <ThemedText
          className={`text-sm ${focused ? "text-black dark:text-white" : "text-gray-500"}`}
        >
          {route.title}
        </ThemedText>
      )}
      indicatorStyle={{ backgroundColor: "green", height: 3 }}
      className="bg-white dark:bg-dark-primary"
      tabStyle={{ width: "auto", paddingHorizontal: 16 }}
      scrollEnabled={true}
    />
  );
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
    />
  );
}

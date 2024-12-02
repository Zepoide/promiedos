import React, { useEffect, useState } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "./ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import MatchesPerDay from "@/pages/MatchesPerDay";
import { formatDate, generateDates } from "@/lib/utils";
import { Dimensions } from "react-native";
interface CustomTabViewProps {
  tabs: string[];
  dates: Date[];
}

export default function CustomTabView({ tabs, dates }: CustomTabViewProps) {
  const [index, setIndex] = useState(6);
  const [routes, setRoutes] = useState(
    tabs.map((tab, index) => {
      return { key: index.toString(), title: tab };
    })
  );

  const { colorScheme } = useColorScheme();

  const initialLayout = {
    height: 0,
    width: Dimensions.get("window").width,
  };

  const renderScene = ({ route }: any) => {
    if (Number(route.key) <= dates.length) {
      return <MatchesPerDay date={dates[Number(route.key)]} />;
    }
    return null;
  };

  useEffect(() => {
    setRoutes(
      tabs.map((tab, index) => {
        return { key: index.toString(), title: tab };
      })
    );
    setIndex(6);
  }, [tabs]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      renderLabel={({ route, focused }) => (
        <ThemedText
          className={`text-sm ${focused ? "text-black dark:text-white " : "text-gray-500"}`}
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
      lazy
      // renderLazyPlaceholder={() => (
      //   <ThemedView className="flex-1 bg-green-500" />
      // )}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      pagerStyle={{
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
      initialLayout={initialLayout}
    />
  );
}

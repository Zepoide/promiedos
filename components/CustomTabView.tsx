import React, { useState } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "./ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";

interface CustomTabViewProps {
  tabs: string[];
  pages: Function[];
  initialPage?: number;
}

export default function CustomTabView({
  tabs,
  pages,
  initialPage = 0,
}: CustomTabViewProps) {
  const [index, setIndex] = useState(initialPage);
  const [routes] = useState(
    tabs.map((tab) => {
      return { key: tab, title: tab };
    })
  );
  const { colorScheme } = useColorScheme();

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
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      pagerStyle={{
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    />
  );
}

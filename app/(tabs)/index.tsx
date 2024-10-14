import React, { useState, useRef, useEffect } from "react";
import { FlatList, View, SafeAreaView, Pressable } from "react-native";
import { useColorScheme } from "nativewind";
import PagerView from "react-native-pager-view";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { generateDates, formatDate } from "@/lib/utils";

const Home = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  // const colorScheme = useColorScheme() || "dark";

  const pagerRef = useRef<PagerView>(null);
  const flatListRef = useRef<FlatList<string>>(null);

  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState<string>(today);

  const [dates, setDates] = useState(generateDates(today));

  const onPageSelected = (event: { nativeEvent: { position: number } }) => {
    setDates(generateDates(dates[event.nativeEvent.position]));
  };

  const scrollToPage = (index: number) => {
    if (pagerRef.current) {
      pagerRef.current.setPageWithoutAnimation(index);
    }
  };

  const scrollToDate = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    }
  };

  const handleDatePress = (chosenDate: string, index: number) => {
    setDates(generateDates(chosenDate));
  };

  useEffect(() => {
    setSelectedDate(dates[7]);
    scrollToDate(7);
    scrollToPage(7);
  }, [dates]);

  return (
    <SafeAreaView
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        flex: 1,
        backgroundColor: Colors[colorScheme ?? "dark"].primary,
      }}
    >
      <View className="flex-row justify-between items-center h-[50px] bg-white dark:bg-[#1B1B1B]">
        <ThemedText className="text-2xl font-extrabold p-3">
          Promiedos
        </ThemedText>
        <Pressable onPress={() => toggleColorScheme()}>
          <ThemedText>CLick {colorScheme}</ThemedText>
        </Pressable>
      </View>
      <View className="flex-row justify-center items-center">
        <FlatList
          ref={flatListRef}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => handleDatePress(item, index)}
              className={`p-3 w-[100px] flex justify-center items-center border-solid border-b-2 ${selectedDate === item ? " border-light-tint  dark:border-[#84DC7B]" : "border-transparent"}`}
            >
              <ThemedText
                className={`text-base font-bold ${selectedDate === item ? `$text-${colorScheme}-text` : "text-gray-500"}`}
              >
                {formatDate(item)}
              </ThemedText>
            </Pressable>
          )}
          data={dates}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: colorScheme === "light" ? "#fff" : "#1B1B1B",
          }}
          getItemLayout={(data, index) => ({
            length: 100,
            offset: 100 * index,
            index,
          })}
          onLayout={() => {
            flatListRef?.current?.scrollToIndex({
              index: 7,
              animated: false,
              viewPosition: 0.5,
            });
          }}
        ></FlatList>
      </View>
      <View className="flex-1 ">
        <PagerView
          ref={pagerRef}
          className="flex-1"
          initialPage={7}
          onPageSelected={onPageSelected}
        >
          {dates.map((date, index) => (
            <ThemedView
              key={index}
              className=" flex justify-center items-center bg-white dark:bg-black"
            >
              <ThemedText>{date}</ThemedText>
            </ThemedView>
          ))}
        </PagerView>
      </View>
    </SafeAreaView>
  );
};

export default Home;

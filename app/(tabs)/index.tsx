import React, { useState, useRef, useEffect } from "react";
import { TouchableOpacity, useColorScheme, FlatList } from "react-native";
import PagerView from "react-native-pager-view";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { generateDates, formatDate } from "@/lib/utils";

const Home = () => {
  const theme = useColorScheme() || "dark";

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
    <ThemedView className="flex-1 flex flex-column justify-center ">
      <ThemedView className="flex-row justify-center items-center">
        <FlatList
          ref={flatListRef}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => handleDatePress(item, index)}
              className={`p-3 w-[100px] flex justify-center items-center border-solid border-b-2 ${selectedDate === item ? " border-light-tint  dark:border-dark-tint" : ""}`}
            >
              <ThemedText className="">{formatDate(item)}</ThemedText>
            </TouchableOpacity>
          )}
          data={dates}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: Colors[theme].primary,
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
      </ThemedView>
      <ThemedView className="flex-1 ">
        <PagerView
          ref={pagerRef}
          className="flex-1"
          initialPage={7}
          onPageSelected={onPageSelected}
        >
          {dates.map((date, index) => (
            <ThemedView
              key={index}
              className=" flex justify-center items-center"
            >
              <ThemedText>{date}</ThemedText>
            </ThemedView>
          ))}
        </PagerView>
      </ThemedView>
    </ThemedView>
  );
};

export default Home;

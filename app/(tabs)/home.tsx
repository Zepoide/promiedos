import React, { useEffect, useState, useRef, useCallback } from "react";
import { TouchableOpacity, Animated, View } from "react-native";
import { useColorScheme } from "nativewind";
import { formatDate, generateDates } from "@/lib/utils";
import Container from "@/components/Container";
import HomeTabView from "@/components/HomeTabView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Icon from "@/components/Icon";
import Calendar from "@/components/Calendar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Colors } from "@/constants/Colors";
import { userStore } from "@/store/userStore";

const HomeScreen = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const today = new Date();
  const [dates, setDates] = useState(generateDates(today));
  const [modalVisible, setModalVisible] = useState(false);
  const [tabs, setTabs] = useState(dates.map((date) => formatDate(date)));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const { toggleThemePreferance } = userStore();

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    Animated.timing(animatedOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
    bottomSheetModalRef.current?.dismiss();
  };

  useEffect(() => {
    setDates(generateDates(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    setTabs([...dates.map((date) => formatDate(date))]);
  }, [dates]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setModalVisible(true);
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleDismissModal = useCallback(() => {
    Animated.timing(animatedOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
    bottomSheetModalRef.current?.dismiss();
  }, []);

  return (
    <Container>
      <ThemedView
        type="primary"
        className="flex-row justify-between items-center "
      >
        <ThemedText className="text-2xl font-extrabold p-3">
          PROMIEDOS
        </ThemedText>
        <ThemedView className="flex flex-row items-center p-3">
          <TouchableOpacity style={{}} onPress={handlePresentModalPress}>
            <Icon name="calendar-outline" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              toggleColorScheme();
              toggleThemePreferance();
            }}
            activeOpacity={0.7}
            className="p-3"
          >
            <Icon
              name={`${colorScheme === "light" ? "sunny-outline" : "moon-outline"}`}
              size={24}
            />
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      <HomeTabView tabs={tabs} dates={dates} />

      {modalVisible && (
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            opacity: animatedOpacity,
          }}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={handleDismissModal}
          />
        </Animated.View>
      )}

      <BottomSheetModal
        ref={bottomSheetModalRef}
        backgroundStyle={{
          backgroundColor: Colors[colorScheme].secondary,
        }}
        handleIndicatorStyle={{ backgroundColor: Colors[colorScheme].text }}
        onDismiss={handleDismissModal}
      >
        <BottomSheetView className="flex-1 justify-center items-center">
          <ThemedView type="secondary" className="">
            <Calendar date={selectedDate} setDate={handleDateChange} />
          </ThemedView>
        </BottomSheetView>
      </BottomSheetModal>
    </Container>
  );
};

export default HomeScreen;

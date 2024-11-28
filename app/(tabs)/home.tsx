import React, { useEffect, useState } from "react";
import {
  Pressable,
  Switch,
  TouchableOpacity,
  Modal,
  Animated,
  Alert,
} from "react-native";
import { useColorScheme } from "nativewind";
import { formatDate, generateDates } from "@/lib/utils";
import Container from "@/components/Container";
import HomeTabView from "@/components/HomeTabView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import MatchesPerDay from "@/components/pages/MatchesPerDay";
import Icon from "@/components/Icon";
import Calendar from "@/components/Calendar";
import CustomTabView from "@/components/CustomTabView";

const HomeScreen = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const today = new Date();
  const [dates, setDates] = useState(generateDates(today));
  const [modalVisible, setModalVisible] = useState(false);
  const [tabs, setTabs] = useState(dates.map((date) => formatDate(date)));

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: Date) => {
    setModalVisible(false);
    setSelectedDate(date);
  };

  useEffect(() => {
    setDates(generateDates(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    setTabs([...dates.map((date) => formatDate(date))]);
  }, [dates]);

  return (
    <Container>
      <ThemedView
        type="primary"
        className="flex-row justify-between items-center "
      >
        <ThemedText className="text-2xl font-extrabold p-3">
          PROMIEDOS
        </ThemedText>
        <ThemedView className="flex flex-row items-center">
          <Pressable style={{}} onPress={() => setModalVisible(true)}>
            <ThemedText style={{}}>Show Modal</ThemedText>
          </Pressable>
          <TouchableOpacity
            onPress={() => toggleColorScheme()}
            activeOpacity={0.8}
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ThemedView className="flex-1 flex justify-center items-center">
          <ThemedView type="background" className="flex m-2 rounded-lg p-2">
            <ThemedView type="primary" className="p-2">
              <ThemedView className="flex-row justify-between">
                <Pressable
                  style={[]}
                  onPress={() => setSelectedDate(new Date())}
                >
                  <ThemedText style={{}}>Today</ThemedText>
                </Pressable>
                <Pressable
                  style={[]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <ThemedText style={{}}>Close</ThemedText>
                </Pressable>
              </ThemedView>
              <Calendar date={selectedDate} setDate={handleDateChange} />
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </Modal>
    </Container>
  );
};

export default HomeScreen;

// pages={dates.map((date) =>
//   React.memo(() => <MatchesPerDay date={date} />)
// )}

// pages={dates.map((date) => () => <MatchesPerDay date={date} />)}

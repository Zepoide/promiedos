import Container from "@/components/Container";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import Calendar from "@/components/Calendar";

export default function App() {
  const [date, setDate] = useState(new Date());

  const [modalVisible, setModalVisible] = useState(false);

  const handleDateChange = (date: Date) => {
    setModalVisible(false);
    setDate(date);
  };

  return (
    <Container>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <ThemedView className="flex-1 flex justify-center items-center">
          <ThemedView type="background" className="flex m-2 rounded-lg p-2">
            <ThemedView type="primary" className="p-2">
              <ThemedView className="flex-row justify-between">
                <Pressable style={[]} onPress={() => setDate(new Date())}>
                  <ThemedText style={{}}>Today</ThemedText>
                </Pressable>
                <Pressable
                  style={[]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <ThemedText style={{}}>Close</ThemedText>
                </Pressable>
              </ThemedView>
              <Calendar date={date} setDate={handleDateChange} />
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </Modal>
      <Pressable style={{}} onPress={() => setModalVisible(true)}>
        <ThemedText style={{}}>Show Modal</ThemedText>
      </Pressable>
      <ThemedText>{date.toString()}</ThemedText>
    </Container>
  );
}

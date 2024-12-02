import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "@/components/Container";
import { ThemedText } from "@/components/ThemedText";

const prueba = () => {
  return (
    <Container>
      <Pressable
        onPress={() => console.log("prueba")}
        pressRetentionOffset={{ right: 1000 }}
      >
        <ThemedText>prueba</ThemedText>
      </Pressable>
    </Container>
  );
};

export default prueba;

const styles = StyleSheet.create({});

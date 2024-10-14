import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  useColorScheme,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";

const Profile = () => {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView
      style={{
        flexDirection: "column",
        justifyContent: "space-evenly",
        flex: 1,
        width: "auto",
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
      className="bg-red-700"
    >
      <ThemedText style={styles.title}>PROFILE</ThemedText>

      <ThemedView className="flex-col gap-3 justify-center items-center">
        <ThemedText className="text-3xl">Log In</ThemedText>
        <TextInput
          placeholder="username"
          className="p-5 text-3xl w-10/12 pl-2 text-white"
        ></TextInput>
        <TextInput
          placeholder="password"
          className="p-5 text-3xl w-10/12 pl-2 text-white"
        ></TextInput>
        <ThemedView className="flex-row">
          <ThemedText>Dont have an account? </ThemedText>
          <Link href={"/register"}>
            <ThemedText>Register</ThemedText>
          </Link>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  all_background: {
    backgroundColor: "#333",
    height: "100%",
    width: "100%",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
});

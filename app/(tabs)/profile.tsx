import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  useColorScheme,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import ThemedInputUser from "@/components/ThemedInputUser";

const Profile = () => {
  const colorScheme = useColorScheme();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{
          flexDirection: "column",
          justifyContent: "space-evenly",
          flex: 1,
          width: "auto",
          backgroundColor: Colors[colorScheme ?? "light"].background,
        }}
      >
        <ThemedView className="flex-col gap-3 justify-center items-center">
          <ThemedText className="text-3xl">Log In</ThemedText>
          <ThemedInputUser name="Email" icon_name="envelope" />
          <ThemedInputUser name="Password" icon_name="lock" />
          <ThemedView className="flex-row">
            <ThemedText>Dont have an account? </ThemedText>
            <Link href={"/register"}>
              <ThemedText>Register</ThemedText>
            </Link>
          </ThemedView>
        </ThemedView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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

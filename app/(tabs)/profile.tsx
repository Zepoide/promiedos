import {
  SafeAreaView,
  useColorScheme,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import ThemedInputUser from "@/components/ThemedInputUser";

const Profile = () => {
  const colorScheme = useColorScheme();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
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
                <ThemedText>Sign Up</ThemedText>
              </Link>
            </ThemedView>
          </ThemedView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Profile;

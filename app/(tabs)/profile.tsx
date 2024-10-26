import {
  SafeAreaView,
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
import SubmitButton from "@/components/SubmitButton";
import { useColorScheme } from "nativewind";

const Profile = () => {
  const { colorScheme } = useColorScheme();

  const handleLogin = () => {
    return;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
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
            <ThemedText className="text-2xl">Log In</ThemedText>
            <ThemedView className="flex-col items-center w-full">
              <ThemedInputUser name="Email" icon_name="envelope" />
              <ThemedInputUser name="Password" icon_name="lock" />
              <SubmitButton title="Log In" onPress={handleLogin} />
              <ThemedView className="flex-row mt-3">
                <ThemedText>Dont have an account? </ThemedText>
                <Link href={"/register"}>
                  <ThemedText>Sign Up</ThemedText>
                </Link>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Profile;

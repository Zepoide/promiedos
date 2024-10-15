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

const Register = () => {
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
            <ThemedText className="text-3xl">Register</ThemedText>
            <ThemedInputUser name="Username" icon_name="user" />
            <ThemedInputUser name="Email" icon_name="envelope" />
            <ThemedInputUser name="Password" icon_name="lock" type="password" />
            <ThemedInputUser
              name="Check Password"
              icon_name="lock"
              type="password"
            />
            <ThemedView className="flex-row">
              <ThemedText>Have an account? </ThemedText>
              <Link href={"/register"}>
                <ThemedText>Log In</ThemedText>
              </Link>
            </ThemedView>
          </ThemedView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Register;

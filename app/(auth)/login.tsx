import {
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Button,
} from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { Link, useRouter } from "expo-router";
import SubmitButton from "@/components/SubmitButton";
import { useColorScheme } from "nativewind";
import apiService from "@/services/api.service";
import { useForm } from "react-hook-form";
import ControllerForm from "@/components/ControllerForm";
import { UserPayload } from "@/context/AuthContext";
import { decodeBase64Url } from "@/lib/utils";
import { Buffer } from "buffer";
import useUser from "@/hooks/useUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

type FormData = {
  email: string;
  password: string;
};

const LogIn = () => {
  const { colorScheme } = useColorScheme();
  const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const { setUser } = useUser();
  const router = useRouter();

  const handleLogin = async ({ email, password }: FormData) => {
    try {
      const response = await apiService.post("/auth/login", {
        email,
        password,
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }
      const json = await response.json();
      const jwtToken = json.token;

      const parts = jwtToken
        .split(".")
        .map((part: string) =>
          Buffer.from(
            part.replace(/-/g, "+").replace(/_/g, "/"),
            "base64"
          ).toString()
        );
      if (parts.length !== 3) {
        throw new Error("Invalid JWT token format");
      }
      console.log(parts[1]);
      const payload: UserPayload = JSON.parse(parts[1]);
      setUser(payload);
      await AsyncStorage.multiRemove(["user", "jwt"]);
      await AsyncStorage.setItem("user", JSON.stringify(payload));
      await AsyncStorage.setItem("jwt", jwtToken);

      router.replace("/(tabs)/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

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
              <ControllerForm
                control={control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: regexEmail,
                    message: "Invalid email",
                  },
                }}
                placeholder="Email"
                iconName="envelope"
                error={errors.email}
              />

              <ControllerForm
                control={control}
                name="password"
                rules={{
                  required: "Password is required",
                }}
                placeholder="Password"
                iconName="lock"
                secureTextEntry
                error={errors.password}
              />
              <SubmitButton
                title="Log In"
                onPress={handleSubmit(handleLogin)}
              />
              <ThemedView className="flex-row mt-3">
                <ThemedText>Dont have an account? </ThemedText>
                <Link replace href={"/register"}>
                  <ThemedText>Sign Up</ThemedText>
                </Link>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </SafeAreaView>
      </TouchableWithoutFeedback>

      {/* <Button title="HOLA" onPress={() => router.replace("/(tabs)/home")} /> */}
    </KeyboardAvoidingView>
  );
};

export default LogIn;

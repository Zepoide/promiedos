// pages/Register.tsx
import React from "react";
import {
  SafeAreaView,
  useColorScheme,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import SubmitButton from "@/components/SubmitButton";
import { useForm } from "react-hook-form";
import ControllerForm from "@/components/ControllerForm";

const Register = () => {
  const colorScheme = useColorScheme();
  const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  type FormData = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleRegister = (data: any) => {
    // Implement your registration logic here
    console.log(data);
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
            <ThemedText className="text-2xl">Register</ThemedText>

            <ControllerForm
              control={control}
              name="username"
              rules={{ required: "Username is required" }}
              placeholder="Username"
              iconName="user"
              error={errors.username}
            />

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
                minLength: {
                  value: 6,
                  message: "Password needs to have more than 6 characters",
                },
                validate: {
                  noSpaces: (value: string) =>
                    !/\s/.test(value) || "Password cannot have white-spaces",
                  hasNumber: (value: string) =>
                    /[0-9]/.test(value) ||
                    "Password needs to have at least one number",
                  hasUppercase: (value: string) =>
                    /[A-Z]/.test(value) ||
                    "Password needs to have at least one capital letter",
                },
              }}
              placeholder="Password"
              iconName="lock"
              secureTextEntry
              error={errors.password}
            />

            <ControllerForm
              control={control}
              name="confirmPassword"
              rules={{
                required: "Please confirm your password",
                validate: (value: string, { password }: { password: string }) =>
                  value === password || "Passwords do not match",
              }}
              placeholder="Confirm Password"
              iconName="lock"
              secureTextEntry
              error={errors.confirmPassword}
            />

            <SubmitButton
              title="Register"
              onPress={handleSubmit(handleRegister)}
            />

            <ThemedView className="flex-row">
              <ThemedText>Have an account? </ThemedText>
              <Link href={"/profile"}>
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

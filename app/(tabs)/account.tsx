import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  Pressable,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";

import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SubmitButton from "@/components/SubmitButton";
import { userStore } from "@/store/userStore";
import apiService, { ApiValidationError } from "@/services/api.service";
import ThemedInput from "@/components/ThemedInput";
import { useForm, Controller, set } from "react-hook-form";
import ControllerForm from "@/components/ControllerForm";
import { err } from "react-native-svg";

const Account = () => {
  const router = useRouter();
  const { user, editUser, logout } = userStore();
  const [logOutModalVisible, setLogOutModalVisible] = useState(false);
  const [username, setUsername] = useState(user!.username);
  const [email, setEmail] = useState(user!.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const [confirmedPassword, setConfirmedPassword] = useState(false);
  const [attempts, setAttemps] = useState(0);
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
    username: "",
  });

  interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const defaultValues = {
    username: user!.username,
    email: user!.email,
    password: "",
    confirmPassword: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm<FormData>({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [user]);

  const onSubmit = async ({
    username,
    email,
    password,
    confirmPassword,
  }: FormData) => {
    try {
      await editUser({
        ...user!,
        username,
        email,
        password,
      });
      clearErrors();
    } catch (error: any) {
      console.log("Error updating profile", JSON.stringify(error, null, 2));
      if (error instanceof ApiValidationError) {
        setError(error.field as keyof FormData, { message: error.message });
        return;
      }
      Alert.alert("Error", "Failed to update profile");
    }
  };

  const checkPassword = async () => {
    try {
      await apiService.post("/auth/check-password", {
        password,
      });
      setConfirmedPassword(true);
      setPassword("");
      setErrorMessages({
        email: "",
        username: "",
        password: "",
      });
    } catch (error: any) {
      if (error?.status === 401) {
        setErrorMessages({
          ...errorMessages,
          password: "Incorrect password",
        });
        setAttemps(attempts + 1);
        return;
      }
      Alert.alert("Error", "Failed to confirm password");
    }
  };

  useEffect(() => {
    if (attempts >= 3) {
      logout();
    }
  }, [attempts]);

  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ThemedView className="p-6 flex-1 space-y-6">
          <ThemedText className="text-2xl font-extrabold">Account</ThemedText>
          <ThemedView className="flex-row justify-between items-center">
            <ThemedText className="text-xl ">
              Welcome {user!.username}!
            </ThemedText>
            <TouchableOpacity onPress={logout}>
              <MaterialCommunityIcons name="logout" size={24} color="#666" />
            </TouchableOpacity>
          </ThemedView>
          {confirmedPassword ? (
            <ThemedView className="flex gap-y-2">
              <Controller
                control={control}
                name="username"
                rules={{
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username needs to have more than 3 characters",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <ThemedInput
                    label="Username"
                    icon="account"
                    onChangeText={onChange}
                    value={value}
                    error={errors.username}
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: regexEmail,
                    message: "Invalid email",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <ThemedInput
                    label="Email"
                    icon="email"
                    onChangeText={onChange}
                    value={value}
                    error={errors.email}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                rules={{
                  validate: (value) =>
                    !value ||
                    value.length >= 6 ||
                    "Password needs to have more than 6 characters",
                }}
                render={({ field: { onChange, value } }) => (
                  <ThemedInput
                    label="Password"
                    icon="lock"
                    value={value}
                    error={errors.password}
                    icon_right={
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        <MaterialCommunityIcons
                          name={showPassword ? "eye-off" : "eye"}
                          size={24}
                          color="#666"
                        />
                      </TouchableOpacity>
                    }
                    onChangeText={onChange}
                    secureTextEntry={!showPassword}
                    placeholder="Enter new password"
                  />
                )}
              />

              <Controller
                control={control}
                name="confirmPassword"
                rules={{
                  validate: (value) =>
                    !value ||
                    value.length >= 6 ||
                    "Password needs to have more than 6 characters",
                }}
                render={({ field: { onChange, value } }) => (
                  <ThemedInput
                    label="Confirm Password"
                    icon="lock"
                    value={value}
                    error={errors.confirmPassword}
                    icon_right={
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        <MaterialCommunityIcons
                          name={showPassword ? "eye-off" : "eye"}
                          size={24}
                          color="#666"
                        />
                      </TouchableOpacity>
                    }
                    onChangeText={onChange}
                    secureTextEntry={!showPassword}
                    placeholder="Confirm new password"
                  />
                )}
              />
              <ThemedView className="flex flex-row justify-center ">
                <SubmitButton
                  title="Update Profile"
                  onPress={handleSubmit(onSubmit)}
                />
              </ThemedView>
            </ThemedView>
          ) : (
            <ThemedView className="flex flex-1 justify-center items-center">
              <ThemedText className="text-lg self-start font-semibold mb-4">
                Confirm password to edit profile
              </ThemedText>
              <ThemedView className="w-full">
                <ThemedInput
                  icon="lock"
                  value={password}
                  error={errorMessages.password}
                  icon_right={
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <MaterialCommunityIcons
                        name={showPassword ? "eye-off" : "eye"}
                        size={24}
                        color="#666"
                      />
                    </TouchableOpacity>
                  }
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholder="Enter new password"
                />
              </ThemedView>
              <ThemedView className="">
                <SubmitButton
                  title="Confirm"
                  onPress={checkPassword}
                  disabled={password.length === 0}
                />
              </ThemedView>
              {attempts > 0 && (
                <ThemedView className="flex-row justify-center mt-4">
                  <ThemedText className="font-bold text-lg text-red-500">
                    {3 - attempts} attempts left
                  </ThemedText>
                </ThemedView>
              )}
            </ThemedView>
          )}
        </ThemedView>
      </ScrollView>
    </Container>
  );
};

export default Account;

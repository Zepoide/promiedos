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
import Toast from "react-native-toast-message";
import ProfileForm from "@/components/ProfileForm";

const Account = () => {
  const { user, logout } = userStore();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmedPassword, setConfirmedPassword] = useState(false);
  const [attempts, setAttemps] = useState(0);
  const [error, setError] = useState({ message: "" });

  const checkPassword = async () => {
    try {
      await apiService.post("/auth/check-password", {
        password,
      });
      setConfirmedPassword(true);
      setPassword("");
      setError({ message: "" });
    } catch (error: any) {
      if (error?.status === 401) {
        setError({ message: "Invalid password" });
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
            <ProfileForm />
          ) : (
            <ThemedView className="flex flex-1 justify-center items-center">
              <ThemedText className="text-lg self-start font-semibold mb-4">
                Confirm password to edit profile
              </ThemedText>
              <ThemedView className="w-full">
                <ThemedInput
                  icon="lock"
                  value={password}
                  error={error}
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

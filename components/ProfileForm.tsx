import React, { useState, useEffect } from "react";
import { useForm, Controller, set } from "react-hook-form";
import {
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import ThemedInput from "@/components/ThemedInput";
import SubmitButton from "@/components/SubmitButton";
import { userStore } from "@/store/userStore";
import Toast from "react-native-toast-message";
import { Alert } from "react-native";
import { ApiValidationError } from "@/services/api.service";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function ProfileForm() {
  const { user, editUser } = userStore();
  const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const [showPassword, setShowPassword] = useState(false);
  const [defaultValues, setDefaultValues] = useState<FormData>({
    username: user!.username,
    email: user!.email,
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    //   reset(defaultValues);
    setDefaultValues({
      username: user!.username,
      email: user!.email,
      password: "",
      confirmPassword: "",
    });
  }, [user]);

  //   console.log("user", user);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
    getValues,
  } = useForm<FormData>({
    defaultValues,
  });

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
      Toast.show({
        type: "success",
        text1: "Profile updated",
      });
    } catch (error: any) {
      console.log("Error updating profile", JSON.stringify(error, null, 2));
      if (error instanceof ApiValidationError) {
        setError(error.field as keyof FormData, { message: error.message });
        return;
      }
      Alert.alert("Error", "Failed to update profile");
    }
  };

  return (
    <ThemedView className="flex-1 justify-center gap-y-2">
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
          validate: (value) => {
            if (value && value.length < 6) {
              return "Password needs to have more than 6 characters";
            }
            if (value && !/[A-Z]/.test(value)) {
              return "Password needs to contain at least one capital letter";
            }
            return true;
          },
        }}
        render={({ field: { onChange, value } }) => (
          <ThemedInput
            label="Password"
            icon="lock"
            value={value}
            error={errors.password}
            icon_right={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
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
          validate: (value) => {
            return value === getValues().password || "Passwords don't match";
          },
        }}
        render={({ field: { onChange, value } }) => (
          <ThemedInput
            label="Confirm Password"
            icon="lock"
            value={value}
            error={errors.confirmPassword}
            icon_right={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
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
          disabled={Object.keys(errors).length > 0}
        />
      </ThemedView>
    </ThemedView>
  );
}

import React, { useState } from "react";
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
import apiService from "@/services/api.service";

const Acount = () => {
  const router = useRouter();
  const { user, editUser, logout } = userStore();
  const [logOutModalVisible, setLogOutModalVisible] = useState(false);
  const [username, setUsername] = useState(user!.username);
  const [email, setEmail] = useState(user!.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const handleSubmit = async ({
    username,
    email,
    password,
    confirmPassword,
  }: any) => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    if (password && password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    if (password && !/[A-Z]/.test(password)) {
      Alert.alert("Error", "Password must contain at least one capital letter");
      return;
    }

    if (!regexEmail.test(email)) {
      Alert.alert("Error", "Invalid email");
      return;
    }

    // Update user
    try {
      const response = await apiService.put(`/user/update/profile`, {
        id: user!.id,
        name: username,
        email,
        password,
      });

      const updatedUser = await response.json();

      editUser(updatedUser);
      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to update profile");
    }
  };

  return (
    <Container>
      <ThemedView className="p-6 space-y-6">
        <ThemedText className="text-2xl font-extrabold">Account</ThemedText>
        <ThemedView className="flex-row justify-between items-center">
          <ThemedText className="text-xl ">
            Welcome {user!.username}!
          </ThemedText>
          <TouchableOpacity onPress={logout}>
            <MaterialCommunityIcons name="logout" size={24} color="#666" />
          </TouchableOpacity>
        </ThemedView>
        <ThemedView className="space-y-2">
          <ThemedText className="text-lg font-semibold">Username</ThemedText>
          <ThemedView className="flex-row items-center border border-gray-700 rounded-lg p-3">
            <MaterialCommunityIcons
              name="account"
              size={24}
              color="#666"
              style={{ marginRight: 10 }}
            />
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder={user!.username}
              placeholderTextColor="#666"
              className="flex-1 text-black dark:text-white "
            />
          </ThemedView>
        </ThemedView>

        <ThemedView className="space-y-2">
          <ThemedText className="text-lg font-semibold">Email</ThemedText>
          <ThemedView className="flex-row items-center border border-gray-700 rounded-lg p-3">
            <MaterialCommunityIcons
              name="email"
              size={24}
              color="#666"
              style={{ marginRight: 10 }}
            />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder={user!.email}
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              className="flex-1 text-black dark:text-white "
            />
          </ThemedView>
        </ThemedView>

        <ThemedView className="space-y-2">
          <ThemedText className="text-lg font-semibold">Password</ThemedText>
          <ThemedView className="flex-row items-center border border-gray-700 rounded-lg p-3">
            <MaterialCommunityIcons
              name="lock"
              size={24}
              color="#666"
              style={{ marginRight: 10 }}
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter new password"
              placeholderTextColor="#666"
              secureTextEntry={!showPassword}
              className="flex-1 text-white"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialCommunityIcons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>

        <ThemedView className="space-y-2">
          <ThemedText className="text-lg font-semibold">
            Confirm Password
          </ThemedText>
          <ThemedView className="flex-row items-center border border-gray-700 rounded-lg p-3">
            <MaterialCommunityIcons
              name="lock"
              size={24}
              color="#666"
              style={{ marginRight: 10 }}
            />
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Enter new password"
              placeholderTextColor="#666"
              secureTextEntry={!showPassword}
              className="flex-1 text-white dark:text-white"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialCommunityIcons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>

        <ThemedView className="flex flex-row justify-center ">
          <SubmitButton
            title="Update Profile"
            onPress={() =>
              handleSubmit({ username, email, password, confirmPassword })
            }
          />
        </ThemedView>
      </ThemedView>
    </Container>
  );
};

export default Acount;

// <Modal
//   animationType="slide"
//   transparent={true}
//   visible={logOutModalVisible}
//   onRequestClose={() => {
//     setLogOutModalVisible(false);
//   }}
// >
//   <ThemedView className="flex-1 justify-center items-center  bg-opacity-50">
//     <ThemedView type="secondary" className="p-6 w-96 rounded-lg">
//       <ThemedText className="text-lg text-center font-bold mb-4">
//         Are you sure you want to logout?
//       </ThemedText>
//       <ThemedView className="flex-row justify-between">
//         <TouchableOpacity
//           onPress={() => setLogOutModalVisible(false)}
//           className="bg-light-primary dark:bg-dark-primary p-2 rounded-lg"
//           activeOpacity={0.8}
//         >
//           <ThemedText className="text-lg font-semibold ">
//             Cancel
//           </ThemedText>
//         </TouchableOpacity>
//         <Pressable
//           onPress={() => {
//             logout();
//           }}
//           className="bg-red-500 p-2 rounded-lg"
//         >
//           <ThemedText className="text-lg font-semibold text-white">
//             Log out
//           </ThemedText>
//         </Pressable>
//       </ThemedView>
//     </ThemedView>
//   </ThemedView>
// </Modal>;

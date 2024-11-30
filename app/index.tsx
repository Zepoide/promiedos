import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserPayload } from "@/context/AuthContext";
// import { useAuthorizedUser } from "@/hooks/useUser";
import { userStore } from "@/store/userStore";

const Page = () => {
  const { user } = userStore();

  if (user) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/login" />;
};

export default Page;

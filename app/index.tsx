import { Redirect } from "expo-router";
import { userStore } from "@/store/userStore";

const Page = () => {
  const { user } = userStore();

  if (user) {
    return <Redirect href="/(tabs)/prueba" />;
  }

  return <Redirect href="/(auth)/login" />;
};

export default Page;

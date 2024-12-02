import { Redirect } from "expo-router";
import { userStore } from "@/store/userStore";

const Page = () => {
  const { user } = userStore();

  console.log(user);
  if (user) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/login" />;
};

export default Page;

import { Redirect } from "expo-router";
import useAuthorizedUser from "@/hooks/useUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Page = () => {
  const { user } = useAuthorizedUser();

  if (user) return <Redirect href="/(tabs)/home" />;

  return <Redirect href="/(auth)/login" />;
};

export default Page;

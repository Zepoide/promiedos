import Container from "@/components/Container";
import { ThemedText } from "@/components/ThemedText";
import { Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const Acount = () => {
  const router = useRouter();
  const logout = async () => {
    await AsyncStorage.clear();
    router.push("/(auth)/login");
  };

  return (
    <Container>
      <ThemedText className="text-2xl font-extrabold p-3">Acount</ThemedText>
      <Pressable onPress={logout}>
        <ThemedText>LogOut</ThemedText>
      </Pressable>
    </Container>
  );
};

export default Acount;

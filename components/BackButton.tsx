import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import Icon from "./Icon";

export default function BackButton() {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => {
        router.back();
      }}
    >
      <Icon name="chevron-back-outline" size={32} />
    </Pressable>
  );
}

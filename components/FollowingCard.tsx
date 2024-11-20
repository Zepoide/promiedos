import { Image, Pressable } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useAuthorizedUser } from "@/hooks/useUser";
import { useRouter } from "expo-router";

interface FollowingProps {
  url: string;
  name: string;
  id: string;
  color?: string;
  text_color?: string;
}

const FollowingCard = ({
  url,
  name,
  color,
  id,
  text_color,
}: FollowingProps) => {
  const router = useRouter();

  const handleFollowingPress = () => {
    router.push(`/(details)/team/${id}`);
    return;
  };
  return (
    <Pressable
      className={`flex-1 m-2 shadow-xl rounded-lg flex items-center justify-center p-5 `}
      style={{ backgroundColor: `#${color ? color : "101749"}` }}
      onPress={() => handleFollowingPress()}
    >
      <Image
        resizeMode="contain"
        source={{ uri: url }}
        className="w-[50px] h-[50px]"
        defaultSource={require("../assets/images/logo-placeholder.png")}
      />
      <ThemedText
        style={{ color: `#${text_color ? text_color : "fff"}` }}
        className="font-bold text-center text-xl p-1 mt-5"
      >
        {name}
      </ThemedText>
    </Pressable>
  );
};

export default FollowingCard;

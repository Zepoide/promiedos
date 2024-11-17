import { Pressable } from "react-native";
import { ThemedText } from "./ThemedText";

import { GestureResponderEvent } from "react-native";

interface FollowButtonProps {
  onPress: () => void;
  following?: boolean;
}

export default function FollowButton({
  onPress,
  following,
}: FollowButtonProps) {
  return (
    <Pressable
      className={`${following ? "bg-dark-primary dark:bg-white" : ""} px-3 py-1 rounded-full border-2 border-black dark:border-white`}
      onPress={onPress}
    >
      <ThemedText
        className={`font-semibold ${following ? "text-white dark:text-black" : "text-black dark:text-white"}`}
      >
        {following ? "Following" : "Follow"}
      </ThemedText>
    </Pressable>
  );
}

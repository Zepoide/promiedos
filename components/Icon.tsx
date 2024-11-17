import Ionicons from "@expo/vector-icons/Ionicons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";
import { useColorScheme } from "nativewind";

export default function TabBarIcon({
  ...props
}: IconProps<ComponentProps<typeof Ionicons>["name"]>) {
  const { colorScheme } = useColorScheme();
  return (
    <Ionicons color={colorScheme === "dark" ? "white" : "black"} {...props} />
  );
}

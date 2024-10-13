import { useColorScheme, View, type ViewProps } from "react-native";
import { Colors } from "@/constants/Colors";

export type ThemedViewProps = ViewProps & {
  className?: string;
  type?: "background" | "primary" | "secondary";
};

export function ThemedView({
  className,
  type = "background",
  ...otherProps
}: ThemedViewProps) {
  const theme = useColorScheme() || "dark";

  return (
    <View
      style={{
        backgroundColor: Colors[theme][type],
      }}
      {...otherProps}
    />
  );
}

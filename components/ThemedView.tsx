import { useColorScheme, View, type ViewProps } from "react-native";

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
      className={`${className} ${theme === "light" ? `bg-light-${type}` : `bg-dark-${type}`}`}
      {...otherProps}
    />
  );
}

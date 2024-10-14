import { Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  className?: string;
};

export function ThemedText({ className, ...otherProps }: ThemedTextProps) {
  return (
    <Text
      className={`text-black dark:text-[#ECEDEE] ${className}`}
      {...otherProps}
    />
  );
}

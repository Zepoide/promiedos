import { Text, type TextProps } from "react-native";

export type TextError = TextProps & {
  className?: string;
};

export function TextError({ className, ...otherProps }: TextError) {
  return (
    <Text className={`text-red-500 w-10/12 ${className}`} {...otherProps} />
  );
}

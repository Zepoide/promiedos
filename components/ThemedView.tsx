// import { Colors } from "@/constants/Colors";
// import { useColorScheme, View, type ViewProps } from "react-native";

// export type ThemedViewProps = ViewProps & {
//   className?: string;
//   type?: "background" | "primary" | "secondary";
// };

// export function ThemedView({
//   className,
//   type = "background",
//   children,
//   ...otherProps
// }: ThemedViewProps) {
//   const theme = useColorScheme() || "dark";
//   console.log(theme, type, Colors[theme][type]);
//   return (
//     <View
//       style={{
//         backgroundColor: Colors[theme][type],
//       }}
//       // className={`${className} ${theme === "light" ? `bg-light-${type}` : `bg-dark-${type}`}`}
//       {...otherProps}
//     >
//       {children}
//     </View>
//   );
// }

import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  type?: "background" | "primary" | "secondary";
};

export function ThemedView({
  style,
  type = "background",
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({}, type);

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}

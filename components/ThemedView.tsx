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
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";


export type ThemedViewProps = ViewProps & {
  type?: "background" | "primary" | "secondary";
};

export function ThemedView({ style, type, ...otherProps }: ThemedViewProps) {
  // const backgroundColor = useThemeColor({}, type);
  const { colorScheme } = useColorScheme();


  return (
    <View
      style={[
        { backgroundColor: type ? Colors[colorScheme][type] : "transparent" },
        style,
      ]}
      {...otherProps}
    />
  );
}

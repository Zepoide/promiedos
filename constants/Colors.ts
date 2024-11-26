/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#007618";
const tintColorDark = "#84DC7B";

export const Colors = {
  light: {
    text: "#000000",
    primary: "#ffffff",
    secondary: "#F5F5F5",
    background: "#FAFAFA",
    tint: tintColorLight,
    icon: "#687076",
    iconBright: "black",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ffffff",
    primary: "#1B1B1B",
    secondary: "#262626",
    background: "#000000",
    tint: tintColorDark,
    icon: "#9BA1A6",
    iconBright: "white",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

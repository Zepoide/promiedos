import React from "react";
import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";

const Container = ({ children }: { children: ReactNode }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <SafeAreaView
      style={{
        justifyContent: "center",
        alignContent: "center",
        flex: 1,
        backgroundColor: Colors[colorScheme ?? "dark"].primary,
      }}
    >
      {children}
    </SafeAreaView>
  );
};

export default Container;

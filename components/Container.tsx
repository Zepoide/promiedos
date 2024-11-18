import React from "react";
import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";

const Container = ({ children }: { children: ReactNode }) => {
  const { colorScheme } = useColorScheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme ?? "dark"].primary,
      }}
      edges={["top", "left", "right"]}
    >
      {children}
    </SafeAreaView>
  );
};

export default Container;

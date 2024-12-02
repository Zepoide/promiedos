import { ActivityIndicator } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";

interface LoaderProps {
  type?: "background" | "primary" | "secondary";
  size?: "small" | "large";
  className?: string;
}

const Loader = ({ type, size, className }: LoaderProps) => {
  return (
    <ThemedView
      type={type ?? "background"}
      className={`flex flex-1 justify-center items-center `}
    >
      <ActivityIndicator size={size ?? "large"} color="green" />
    </ThemedView>
  );
};

export default Loader;

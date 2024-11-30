import { ActivityIndicator } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";

const Loader = ({
  type,
}: {
  type?: "background" | "primary" | "secondary";
}) => {
  return (
    <ThemedView
      type={type ?? "background"}
      className="flex flex-1 justify-center  items-center"
    >
      <ActivityIndicator size="large" color="green" />
    </ThemedView>
  );
};

export default Loader;

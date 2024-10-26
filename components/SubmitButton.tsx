import React from "react";
import { TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";

type SubmitButtonProps = {
  title: string;
  onPress: () => void;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      className="bg-green-500 py-3 px-5 rounded-lg shadow-md mt-5 w-6/12"
      onPress={onPress}
    >
      <ThemedText className="text-lg font-bold text-center">{title}</ThemedText>
    </TouchableOpacity>
  );
};

export default SubmitButton;

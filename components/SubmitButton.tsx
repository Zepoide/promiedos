import React from "react";
import { TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";

type SubmitButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
  title,
  onPress,
  disabled,
}) => {
  return (
    <TouchableOpacity
      className={`${disabled ? "bg-gray-400 dark:bg-gray-500" : "bg-green-500"} py-3 px-5 rounded-lg shadow-md mt-5 w-6/12`}
      onPress={onPress}
      disabled={disabled ?? false}
    >
      <ThemedText
        className={`text-lg font-bold text-center ${disabled ? "text-gray-300 dark:text-gray-400" : ""} `}
      >
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
};

export default SubmitButton;

import React from "react";
import { Controller, FieldError } from "react-hook-form";
import ThemedInputUser from "@/components/ThemedInputUser";
import { TextError } from "@/components/TextError";

interface ControllerFormProps {
  control: any;
  name: string;
  rules?: Object;
  placeholder: string;
  iconName: string;
  secureTextEntry?: boolean;
  error?: FieldError;
}

const ControllerForm: React.FC<ControllerFormProps> = ({
  control,
  name,
  rules,
  placeholder,
  iconName,
  secureTextEntry = false,
  error,
}) => {
  return (
    <>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <ThemedInputUser
            name={placeholder}
            icon_name={iconName}
            error={error}
            type={secureTextEntry ? "password" : "text"}
            onChangeText={onChange}
            value={value}
          />
        )}
        name={name}
      />
      {error && <TextError>{error.message?.toString()}</TextError>}
    </>
  );
};

export default ControllerForm;

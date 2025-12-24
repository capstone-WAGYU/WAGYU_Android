import { colors } from "@/constants";
import React, { useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

interface InfoInputProps extends TextInputProps {
  label?: string;
  size?: "medium" | "large";
  variant?: "filled";
}

const InfoInput = ({
  label,
  size = "large",
  variant = "filled",
  style,
  ...props
}: InfoInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.wrapper,
        { borderBottomColor: isFocused ? colors.MainColor : colors.GRAY3 },
        styles[size],
        styles[variant],
      ]}
    >
      <TextInput
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={label}
        placeholderTextColor={colors.GRAY2}
        style={[styles.input, style]}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    paddingHorizontal: 6,
    width: "100%",
    marginVertical: 20,
  },
  large: {
    height: 38,
  },
  medium: {
    height: 32,
  },
  filled: {
    backgroundColor: colors.WHITE,
    borderBottomWidth: 1,
  },
  input: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default InfoInput;

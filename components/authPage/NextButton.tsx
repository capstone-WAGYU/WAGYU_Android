import { colors } from "@/constants";
import React from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

interface NextButtonProps extends PressableProps {
  label: string;
  size?: "medium" | "large";
  variant?: "filled";
}

function NextButton({
  label,
  size = "large",
  variant = "filled",
  disabled,
  ...props
}: NextButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        styles[size],
        styles[variant],

        disabled && styles.disabled,

        pressed && !disabled && styles.pressed,
      ]}
      {...props}
    >
      <Text style={[styles.text, disabled && styles.disabledText]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  large: {
    width: "100%",
    height: 45,
  },
  medium: {},

  filled: {
    backgroundColor: colors.MainColor,
  },

  disabled: {
    backgroundColor: colors.GRAY5,
  },

  text: {
    color: colors.WHITE,
    fontWeight: "bold",
  },

  disabledText: {
    color: colors.GRAY3,
  },

  pressed: {
    opacity: 0.8,
  },
});

export default NextButton;

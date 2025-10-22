import { colors } from "@/constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

interface AddAnnounceButtonProps extends PressableProps {
  label: string;
  size?: "medium" | "large";
  variant?: "filled";
}

function AddAnnounceButton({
  label,
  size = "large",
  variant = "filled",
  ...props
}: AddAnnounceButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        styles[size],
        styles[variant],
        pressed && styles.pressed,
      ]}
      {...props}
    >
      <MaterialIcons
        name="keyboard-arrow-down"
        size={24}
        color={colors.GRAY0}
      />
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  large: {
    width: "100%",
    height: 35,
  },
  medium: {},
  filled: {
    fontSize: 14,
    fontWeight: "bold",
  },
  text: {
    color: colors.GRAY0,
    fontWeight: 500,
  },
  pressed: {
    opacity: 0.8,
  },
});

export default AddAnnounceButton;

import { colors } from "@/constants";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

interface AddressButtonProps extends PressableProps {
  label: string;
  size?: "medium" | "large";
  variant?: "filled";
}

function AddressButton({
  label,
  size = "large",
  variant = "filled",
  ...props
}: AddressButtonProps) {
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
      <MaterialCommunityIcons name="target" size={24} color={colors.GRAY0} />
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.GRAY3,
    gap: 3,
  },
  large: {
    width: "100%",
    height: 46,
  },
  medium: {},
  filled: {
    fontSize: 14,
    fontWeight: "bold",
  },
  text: {
    fontSize: 13,
    color: colors.GRAY11,
    fontWeight: 500,
  },

  pressed: {
    opacity: 0.8,
  },
});

export default AddressButton;

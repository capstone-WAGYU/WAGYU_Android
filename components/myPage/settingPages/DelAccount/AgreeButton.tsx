import { colors } from "@/constants";
import React from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

interface AgreeButtonProps extends PressableProps {
  label: string;
  size?: "medium" | "large";
  variant?: "filled";
}

function AgreeButton({
  label,
  size = "large",
  variant = "filled",
  onPress,
  ...props
}: AgreeButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        styles[size],
        styles[variant],
        pressed && styles.pressed,
      ]}
      onPress={onPress} // ✅ 부모에서 내려준 onPress 실행
      {...props}
    >
      <Text style={styles.text}>{label}</Text>
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
    width: "68%",
    height: 45,
  },
  medium: {},
  filled: {
    backgroundColor: colors.MainColor,
  },
  text: {
    color: colors.WHITE,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.8,
  },
});

export default AgreeButton;

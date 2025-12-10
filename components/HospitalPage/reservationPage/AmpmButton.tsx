import { colors } from "@/constants";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface AmpmButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  size?: "medium" | "large";
  variant?: "filled";
}

function AmpmButton({
  label,
  selected,
  onPress,
  size = "large",
  variant = "filled",
}: AmpmButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[size],
        styles[variant],
        selected && styles.selected, // ★ 선택 상태일 때 스타일 고정
      ]}
    >
      <Text style={[styles.text, selected && styles.selectedText]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  large: {
    width: 80,
    height: 38,
  },
  medium: {},
  filled: {
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: colors.GRAY3,
  },

  text: {
    color: colors.GRAY1,
    fontWeight: "bold",
  },

  selected: {
    backgroundColor: colors.MainColor,
    borderColor: colors.MainColor,
  },
  selectedText: {
    color: colors.WHITE,
  },
});

export default AmpmButton;

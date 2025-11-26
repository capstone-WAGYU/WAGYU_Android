import { colors } from "@/constants";
import { useAuth } from "@/context/useAuth";
import { router } from "expo-router";
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
  ...props
}: AgreeButtonProps) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace("/auth");
  };
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        styles[size],
        styles[variant],
        pressed && styles.pressed,
      ]}
      {...props}
      onPress={handleLogout}
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
    fontSize: 14,
    fontWeight: "bold",
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

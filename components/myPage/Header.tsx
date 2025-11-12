import React from "react";
import { PressableProps, StyleSheet, Text, View } from "react-native";
interface HeaderProps extends PressableProps {
  label: string;
  variant?: "filled";
}

function Header({ label, variant = "filled", ...props }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flexDirection: "row",
  },
  titleContainer: {
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  pressed: {
    opacity: 0.3,
  },
});

export default Header;

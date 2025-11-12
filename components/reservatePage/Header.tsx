import EvilIcons from "@expo/vector-icons/EvilIcons";
import React from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
interface HeaderProps extends PressableProps {
  label: string;
  variant?: "filled";
}

function Header({ label, variant = "filled", ...props }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.emtiy} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{label}</Text>
      </View>
      <Pressable
        style={({ pressed }) => [styles.icon, pressed && styles.pressed]}
        {...props}
      >
        <Text>내위치</Text>
        <EvilIcons name="location" size={24} color="black" />
      </Pressable>
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
  emtiy: {
    flex: 1,
  },
  icon: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
  },
  pressed: {
    opacity: 0.3,
  },
});

export default Header;

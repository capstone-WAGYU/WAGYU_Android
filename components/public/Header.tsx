import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
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
  const goBack = () => {
    router.push("/(tabs)/my");
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.icon, pressed && styles.pressed]}
        {...props}
        onPress={goBack}
      >
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </Pressable>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{label}</Text>
      </View>
      <View style={styles.emtiy} />
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
    justifyContent: "flex-start",
    flex: 1,
  },
  pressed: {
    opacity: 0.3,
  },
});

export default Header;

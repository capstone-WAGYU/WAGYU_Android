import { colors } from "@/constants";
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
    router.back();
  };

  return (
    <View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: colors.GRAY6,
    paddingHorizontal: 15,
  },
  titleContainer: {
    alignItems: "flex-start",
    paddingLeft: 12,
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
  },
  pressed: {
    opacity: 0.3,
  },
});

export default Header;

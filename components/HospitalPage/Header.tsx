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
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        {...props}
        style={({ pressed }) => [styles.icon, pressed && styles.pressed]}
        onPress={goBack}
      >
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </Pressable>

      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {label}
        </Text>
      </View>

      <View style={styles.rightSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderColor: colors.GRAY6,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.3,
  },
  titleContainer: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  rightSpacer: {
    width: 24, // 오른쪽 여백 고정
  },
});

export default Header;

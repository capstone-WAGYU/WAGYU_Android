import { colors } from "@/constants";
import React from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface SettingProps extends PressableProps {
  label: string;
  size?: "medium" | "large";
}

function Setting({ size = "large", label, ...props }: SettingProps) {
  return (
    <Pressable style={({ pressed }) => pressed && styles.pressed} {...props}>
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
  labelContainer: {
    padding: 16,
    borderTopColor: colors.GRAY9,
    borderTopWidth: 1,
  },
  label: {
    fontSize: 12,
  },

  pressed: {
    opacity: 0.6,
  },
});

export default Setting;

import { colors } from "@/constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { PressableProps, StyleSheet, TextInput, View } from "react-native";

interface MessageInputProps extends PressableProps {
  label: string;
  size?: "medium" | "large";
  variant?: "filled";
}

function MessageInput({ label }: MessageInputProps) {
  return (
    <View style={styles.container}>
      <TextInput placeholder={label} style={styles.barContainer} />
      <View style={styles.iconContainer}>
        <View style={styles.blueCircle}>
          <MaterialIcons name="keyboard-arrow-up" size={24} color="white" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  barContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: colors.GRAY3,
    paddingHorizontal: 10,
    color: "black",
  },
  iconContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.GRAY3,
    padding: 10,
  },
  container: {
    flexDirection: "row",
  },
  blueCircle: {
    padding: 4,
    borderRadius: "100%",
    backgroundColor: colors.MainColor,
  },
});

export default MessageInput;

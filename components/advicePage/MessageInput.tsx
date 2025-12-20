import { colors } from "@/constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

interface MessageInputProps {
  label: string;
  value: string;
  disabled?: boolean;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}

function MessageInput({
  label,
  value,
  onChangeText,
  onSubmit,
  disabled = false,
}: MessageInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={label}
        style={styles.barContainer}
        value={value}
        onChangeText={onChangeText}
        editable={!disabled}
      />

      <Pressable
        style={styles.iconContainer}
        onPress={onSubmit}
        disabled={disabled}
      >
        <View style={[styles.blueCircle, disabled && { opacity: 0.5 }]}>
          <MaterialIcons name="keyboard-arrow-up" size={24} color="white" />
        </View>
      </Pressable>
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

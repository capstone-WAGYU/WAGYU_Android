import { colors } from "@/constants";
import React from "react";
import { PressableProps, StyleSheet, Text, View } from "react-native";
interface ChatUserProps extends PressableProps {
  message: string;
  variant?: "filled";
}

function ChatUser({ message, variant = "filled", ...props }: ChatUserProps) {
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  messageContainer: {
    maxWidth: "90%",
    marginVertical: 12,
    padding: 12,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: colors.BLUE0,
  },
});

export default ChatUser;

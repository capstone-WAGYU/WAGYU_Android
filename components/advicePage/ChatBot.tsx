import { colors } from "@/constants";
import React from "react";
import { Image, PressableProps, StyleSheet, Text, View } from "react-native";

interface ChatBotProps extends PressableProps {
  message: string;
  variant?: "filled";
}

function ChatBot({ message, variant = "filled", ...props }: ChatBotProps) {
  return (
    <View style={styles.container}>
      <View style={styles.containerChild}>
        <View style={styles.chatBotProfile}>
          <Image source={require("../../assets/images/botProfile.png")} />
        </View>

        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  containerChild: {
    gap: 14,
  },
  chatBotProfile: {
    width: 10,
    height: 10,
    borderRadius: 100,
  },
  messageContainer: {
    maxWidth: "90%",
    minWidth: 110,
    marginVertical: 12,
    padding: 12,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: colors.BLUE0,
  },
  messageText: {
    flexShrink: 1,
  },
});

export default ChatBot;

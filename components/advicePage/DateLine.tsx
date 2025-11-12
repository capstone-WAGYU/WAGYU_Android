import { colors } from "@/constants";
import React from "react";
import { PressableProps, StyleSheet, Text, View } from "react-native";
interface DateLineProps extends PressableProps {
  date: string;
  variant?: "filled";
}

function DateLine({ date, variant = "filled" }: DateLineProps) {
  return (
    <View style={styles.container}>
      <View style={styles.grayLine} />
      <View style={styles.dateText}>
        <Text>{date}</Text>
      </View>

      <View style={styles.grayLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  grayLine: {
    height: 1,
    width: "100%",
    backgroundColor: colors.GRAY0,
  },
  dateText: {
    marginHorizontal: 15,
  },
});

export default DateLine;

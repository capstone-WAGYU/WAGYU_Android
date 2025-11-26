import { colors } from "@/constants";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { PressableProps, StyleSheet, Text, View } from "react-native";
interface AgreeCheckProps extends PressableProps {
  label: string;
  variant?: "filled";
}

function AgreeCheck({ label, variant = "filled", ...props }: AgreeCheckProps) {
  const [isChecked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={setChecked}
        color={isChecked ? colors.MainColor : undefined}
      />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 3,
  },
  checkbox: {
    margin: 8,
  },
  text: {
    fontSize: 13,
  },
});

export default AgreeCheck;

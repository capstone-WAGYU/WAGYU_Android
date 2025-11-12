import { colors } from "@/constants";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { PressableProps, StyleSheet, TextInput, View } from "react-native";

interface SearchBarButtonProps extends PressableProps {
  label: string;
  size?: "medium" | "large";
  variant?: "filled";
}

function SearchBarButton({ label }: SearchBarButtonProps) {
  return (
    <View style={styles.container}>
      <TextInput placeholder={label} style={styles.barContainer} />
      <View style={styles.iconContainer}>
        <Feather name="search" size={24} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  barContainer: {
    flex: 1,
    backgroundColor: colors.GRAY5,
    paddingHorizontal: 10,
    color: "black",
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  iconContainer: {
    backgroundColor: colors.GRAY5,
    padding: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  container: {
    flexDirection: "row",
  },
});

export default SearchBarButton;

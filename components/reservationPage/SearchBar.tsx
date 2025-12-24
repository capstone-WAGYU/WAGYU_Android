import { colors } from "@/constants";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
  placeholder: string;
}

function SearchBar({
  value,
  onChangeText,
  onSearch,
  placeholder,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.barContainer}
        returnKeyType="search"
        onSubmitEditing={onSearch}
      />
      <Pressable style={styles.iconContainer} onPress={onSearch}>
        <Feather name="search" size={24} color="black" />
      </Pressable>
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
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    marginBottom: 10,
  },
});

export default SearchBar;

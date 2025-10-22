import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

function PetInforHeader() {
  return (
    <View style={styles.container}>
      <Pressable onPress={router.back}>
        <MaterialIcons name="keyboard-arrow-left" size={32} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: -10,
  },
});

export default PetInforHeader;

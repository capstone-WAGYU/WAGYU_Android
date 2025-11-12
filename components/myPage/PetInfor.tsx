import React from "react";
import { PressableProps, StyleSheet, Text, View } from "react-native";
import PetCard from "./PetCard";
import PetCardAdd from "./PetCardAdd";
interface PetInforProps extends PressableProps {
  variant?: "filled";
}

function PetInfor({ variant = "filled", ...props }: PetInforProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>반려동물</Text>

      <PetCard name={"최인규"} breed={"치와와"} date={"2025.09.09"} />
      <PetCardAdd />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "column",
  },
  // titleContainer: {
  //   flex: 1,
  // },
  title: {
    fontSize: 14,
    paddingVertical: 12,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.3,
  },
});

export default PetInfor;

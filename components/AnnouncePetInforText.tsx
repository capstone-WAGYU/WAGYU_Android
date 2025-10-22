import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  Label: ReactNode;
}

function AnnouncePatInforText({ Label }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{Label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 20,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default AnnouncePatInforText;

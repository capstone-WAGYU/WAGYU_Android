import React from "react";
import { Image, PressableProps, StyleSheet, Text, View } from "react-native";
interface UserEmailProps extends PressableProps {
  name: string;
  email: string;
  variant?: "filled";
}

function UserEmail({
  name,
  email,
  variant = "filled",
  ...props
}: UserEmailProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{name}</Text>
      <View style={styles.emailContainer}>
        <Image source={require("../../assets/images/kakao_icon.png")} />
        <Text style={styles.emailText}>{email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    gap: 10,
  },
  nameText: {
    fontWeight: "bold",
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  emailText: {},
});

export default UserEmail;

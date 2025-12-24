import { colors } from "@/constants";
import React from "react";
import { PressableProps, StyleSheet, Text, View } from "react-native";
interface UserInfoProps extends PressableProps {
  name: string;
  nickname: string;
  variant?: "filled";
}

function UserInfo({
  name,
  nickname,
  variant = "filled",
  ...props
}: UserInfoProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{name}</Text>
      {/* <View style={styles.emailContainer}> */}
      {/* <Image source={require("../../assets/images/kakao_icon.png")} /> */}
      <Text> - </Text>
      <Text style={styles.emailText}>{nickname}</Text>
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 15,
    // gap: 10,
  },
  nameText: {
    fontWeight: "bold",
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  emailText: {
    color: colors.GRAY2,
  },
});

export default UserInfo;

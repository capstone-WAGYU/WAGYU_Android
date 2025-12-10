import { colors } from "@/constants";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface ServiceInfoProps {
  title: string;
  content: string;
  star: string;
  userInfo: string;
}

function ServiceInfo({ title, content, star, userInfo }: ServiceInfoProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.title}>{title}님</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.starContainer}>
          <Image source={require("../../../assets/images/star.png")} />
          <Text style={styles.star}>{star}</Text>
        </View>
        <View>
          <Text style={styles.content}>{userInfo}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 120,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.GRAY6,
    padding: 18,
    flexDirection: "row",
    marginVertical: 6,
  },
  leftContainer: {
    flex: 3,
    gap: 5,
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    fontSize: 12,
    color: colors.GRAY0,
  },
  star: {
    fontSize: 18,
    fontWeight: "600",
  },
  starContainer: {
    gap: 5,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default ServiceInfo;

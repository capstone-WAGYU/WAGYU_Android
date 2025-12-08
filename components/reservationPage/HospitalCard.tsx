import { colors } from "@/constants";
import React from "react";
import {
  Image,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface HospitalCardProps extends PressableProps {
  title: string;
  location: string;
  open: string;
  variant?: "filled";
}

function HospitalCard({
  title,
  location,
  open,
  variant = "filled",
  ...props
}: HospitalCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles[variant], pressed && styles.pressed]}
      {...props}
    >
      <View style={styles.childContainer}>
        <View style={styles.leftContainer}>
          <View style={styles.TLContainer}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.locationText}>{location}</Text>
          </View>
          <View style={styles.openContainer}>
            <Text style={styles.openText}>{open}</Text>
          </View>
        </View>

        <View style={styles.rightContainer}>
          <Image source={require("../../assets/images/hospital_Img.png")} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  childContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomColor: colors.GRAY6,
    borderBottomWidth: 1,
  },
  medium: {},
  filled: {},
  leftContainer: {
    height: 75,
    justifyContent: "space-between",
  },
  TLContainer: {
    gap: 3,
  },
  rightContainer: {
    height: 75,
  },
  titleText: {
    color: colors.Black,
    fontWeight: "bold",
  },
  locationText: {
    color: colors.GRAY2,
  },
  openText: {
    color: colors.WHITE,
    fontSize: 10,
  },
  openContainer: {
    backgroundColor: colors.MainColor,
    width: 50,
    alignItems: "center",
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.8,
  },
});

export default HospitalCard;
